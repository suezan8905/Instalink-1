import express from "express";
import { 
    registerUser,
    loginUser, 
    authenticateUser,
    resendEmailVerificationLink,
    verifyEmailAccount,
    sendForgotPasswordMail,
    resetPassword,
} from "../controller/user.js";
import { verifyToken, authorizedRoles } from "../middleware/auth.js";
import { rateLimiter } from "../middleware/rateLimiter.js";
import { cacheMiddleware } from "../middleware/cache.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", rateLimiter, loginUser);
router.post(
    "/resend-verification-email",
    rateLimiter,
    verifyToken,
    authorizedRoles("user", "admin"),
    resendEmailVerificationLink
);
router.post("/sendforgot-password-mail", sendForgotPasswordMail) //this is for forgotten password and pass the controller function 
// get
router.get(
  "/user",
  verifyToken,
  authorizedRoles("user", "admin"),
  cacheMiddleware("auth_User", 600),
  authenticateUser
);

router.patch(
  "/verify-account/:userId/:verificationToken",
   verifyToken,
   authorizedRoles("user", "admin"),
   verifyEmailAccount
);
router.patch("/reset-Password/:userId/:passwordToken", resetPassword);

export default router; //it means we are exporting everything inside of this place
// mutating: updating something that already exists
