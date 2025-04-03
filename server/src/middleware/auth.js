import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

export const verifyToken = async (req, res, next) => {
  //extract token from req.headers
  const { authorization: token } = req.headers;
  console.log(token);

  if (!token) {
    return next(createHttpError(403, "You are unathenticated"));
  }
  //if token does not begin with the word - Bearer
  if (!token.startsWith("Bearer")) {
    return next(createHttpError(401, "Token format is invalid"));
  }
  // we're spliting the token to enable it return the error we want
  //remove rearer word from token
  const extractToken = token.split(" ")[1];
  try {
    //verify token using JWT
    const decodedToken = jwt.verify(extractToken, process.env.JWT_SECRETE_KEY);
    // Assign our decodedToken to req.user
    req.user = decodedToken; //this is we simplying getting details on our logged in user.
    next();
  } catch (error) {
    next(error);

  }
};

// authorized roles
export const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(createHttpError(403, "User unauthorized for this request"));
    }
    // use next handlet to call what's supposed to happen after running the checks
    next();
  };
};



// when using JWT authentication, one should include "Bearer" similar to dummyJson
