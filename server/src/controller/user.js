import User from "../model/user.js"; // the extension is because its a file so it should be added
import createHttpError from "http-errors";
import bcrypt from "bcryptjs"; //from npm bvrypt.js
import crypto from "crypto"; //this are inbuilt modules because it is embeded in react, it does not need to be exported because it is already part of react
import { sendMail } from "../config/emailService.js";
import { generateAccessToken } from "../config/generateToken.js";

export const registerUser = async (req, res, next) => {
  const { username, email, fullname, password } = req.body; //get info from client via form
  // req.body: This is used to pass information
  try {
    if (!username || !email || !fullname || !password) {
      return next(createHttpError(400, "All Fields are required"));
    }
    // check if user already exists in our database
    const [existingUsername, existingEmail] = await Promise.all([
      User.findOne({ username: username }),
      User.findOne({ email: email }),
    ]);
    if (existingUsername) {
      return next(createHttpError(409, "Username already exists"));
    }
    if (existingEmail) {
      return next(createHttpError(409, "Email already exists"));
    }
    //proceeds to register user if user doesn't exists
    const salt = await bcrypt.genSalt(10); // encryption mechanism for to handle password
    const hashedPassword = await bcrypt.hash(password, salt); //encrypt the user password
    // proceed to create the user
    const user = await User.create({
      username,
      email,
      fullname,
      password: hashedPassword,
    });
    // generate the verification token
    const verifyAccountToken = crypto.randomBytes(20).toString("hex");
    user.verificationToken = verifyAccountToken; //this is we callig it from the user model (crypto module in Node.js,) it was generated from crypto modules and each user gets a unique token.

    user.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; //at the operation, a count down starts from the 20
    await user.save(); //this is to save the document from mongoose (small l.u- it has everything we did in the model user )

    //specify the client verifyAccountlink
    const verifyAccountlink = `${process.env.CLIENT_URL}/verify-email/
    ${user._id}/${user.verificationToken}`;
    // send email to user
    await sendMail({
      fullname: user.fullname,
      intro: [
        "Welcome to Instashots",
        "We are very excited to have you onboard",
      ],
      instructions: `To access our platform , please verify your email using this link: ${verifyAccountlink}.Link will expire after 24 hours. `,
      btnText: "Verify",
      subject: "Email Verification",
      to: user.email,
    });
    // generate access token
    const accessToken = generateAccessToken(user._id, user.role);
    // send a response to the client
    res.status(201).json({
      success: true,
      message:
        "Account created successfully, please check your mail in order to verify your account",
      accessToken,
    });
  } catch (error) {
    next(error); //anything theres a general error, it'll help us catch it and pass it to the (app.js) where we handled general error
  }
};

export const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return next(createHttpError(400, "Username or password is missing"));
    }
    // find user - password is hidden by default, using select method brings it back
    // (This is for the password field)
    const user = await User.findOne({ username: username }).select("+password");
    if (!user) {
      return next(createHttpError(404, "Account not found"));
      //this is for document not found, and will return a 404 error
    }
    // handle password check
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createHttpError(401, "Invalid credentials"));
    }
    // the above is for the password, if it is not correct, it'll throw this error above.
    // if all checks out, generate and send accessToken
    const accessToken = generateAccessToken(user._id, user.role);
    res.status(200).json({
      success: true,
      accessToken,
      message: `Welcome ${user.username}`,
    });
  } catch (error) {
    next(error);
  }
};

// this is for authenticating the user
export const authenticateUser = async (req, res, next) => {
  const { id: userId } = req.user;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(createHttpError(404, "User not found"));
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const resendEmailVerificationLink = async (req, res, next) => {
  const { id: userId } = req.user;
  try {
    const user = await User.findById(userId);
    // generate the verirification token
    const verifyAccountToken = crypto.randomBytes(20).toString("hex");
    user.verificationToken = verifyAccountToken;
    user.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();
    const verifyAccountlink = `${process.env.CLIENT_URL}/verify-email/${user._id}/${user.verificationToken}`;
    // send email to user
    await sendMail({
      fullname: user.fullname,
      intro: [
        "Welcome to Instashots",
        "We are very excited to have you onboard",
      ],

      instructions: `To access our platform , please verify your email using this link: ${verifyAccountlink}.Link will expire after 24 hours. `,
      btnText: "Verify",
      subject: "Email Verification",
      to: user.email,
    });
    res
      .status(200)
      .json({ success: true, message: "Email verification link sent" });
  } catch (error) {
    next(error);
  }
};

export const verifyEmailAccount = async (req, res, next) => {
  const { userId, verificationToken } = req.params;
  try {
    if (!userId || !verificationToken) {
      return next(
        createHttpError(400, "UserId or verificationToken not provided")
      );
    }
    // find useer
    const user = await User.findOne({
      _id: userId,
      verificationToken: verificationToken,
    }).select("+verificationToken + verificationTokenExpires");
    if (!user) {
      return next(createHttpError(404, "Invalid user id or reset token-"));
    }
    // check token expiry
    if (user.verificationTokenExpires < Date.now()) {
      user.verificationToken = null;
      user.verificationTokenExpires = null;
      await user.save();
      return next(
        createHttpError(
          401,
          "Verification link has expired, please request a new one"
        )
      );
    } else {
      user.isVerified = true;
      user.verificationToken = null;
      user.verificationTokenExpires = null;
      await user.save();
    }
    res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    next(error);
  }
};

export const sendForgotPasswordMail = async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email) {
      return next(createHttpError(404, "User account not found"));
    }
    const user = await User.findOne({ email });
    if (!user) {
      return next(createHttpError(404, "User account not found"));
    }
  
    // generate the verirification token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.passwordResetToken = resetToken;
    user.passwordResetTokenExpires = Date.now() + 30 * 60 * 1000;
    await user.save();
    const resetPasswordLink = `${process.env.CLIENT_URL}/auth/reset-password/${user._id}/${user.passwordResetToken}`;
    // send email to user
    await sendMail({
      fullname: user.fullname,
      intro: [
        "You have requested a password rest for your account",
        "If you did not make this request, kindly ignore this email",
      ],
      instructions: `Click here to reset your password: ${resetPasswordLink},
      Link will expire after 30 min`,
      btnText: "Reset Password",
      subject: "Password Reset",
      to: user.email,
    });
    res.status(200).json({
      success: true,
      message: "Password reset link has been sent to your email",
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  // this is for the link sent for the resent password
  const { newPassword, confirmPassword } = req.body;
  const { userId, passwordToken } = req.params;
  try {
    if (!newPassword || !confirmPassword) {
      return next(
        createHttpError(404, "New password or confirm password is missing")
      );
    }
    // find user
    const user = await User.findOne({
      _id: userId,
      passwordResetToken: passwordToken,
    }).select("+passwordResetToken +passwordResetTokenExpires");
    if (!user) {
      return next(createHttpError(404, "User or invalid reset token"));
    }
    // check token expiry
    if (user.passwprdResetTokenExpires < Date.now()) {
      user.passwordResetToken = null;
      user.passwordResetTokenExpires = null;
      await user.save();
      return next(
        createHttpError(
          401,
          "Password reseet link has expired, please request a new one"
        )
      );
    }
    //  check newPassword and confirmPassword are same
    if (newPassword !== confirmPassword) {
      return next(
        createHttpError(400, "New password and confirm password do not match")
      );
    }
    // proceed to hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    user.passwordResetToken = null;
    user.passwordResetTokenExpires = null;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Password has been updated" });
  } catch (error) {
    next(error);
  }
};

// 201 is the successful code for a new statutory document

// every database comes with an id hence the "user._id"
// if you are to use two api, instead of doing it separately, use "promise" more like to group both
// each time we make an api call, we must always have a request and response as well.

// "In React, if we have the same object twice, we can simply reuse or reference one.";

// bcrypt is used for encryting stuff (moslty password)

// verificaton token and jwt token  (it is stateless, it does not live with the data, only work for the now time) Verify user identity (email/phone)	Authenticate and authorize requests
