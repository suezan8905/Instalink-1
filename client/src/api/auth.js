import { Await } from "react-router";
import axiosInstance from "../utils/axiosInstance"; // we copied this folder from dummyjson as we needed sae information 



export const registerUser = async(formData)=> {
    // the formData is from the post man, that is the form data we used in the register user 
    return await axiosInstance.post("/auth/register", formData); //the auth.register, is from the postman register user
};
export const loginUser = async (formData)=> {
     return await axiosInstance.post("/auth/login", formData); 
};

export const authenticateUser = async (token) => {
    return await axiosInstance.get("/auth/user", {
        headers: {
            Authorization: `Bearer ${token}`,
// we used back ticks here because of the token as it is dynamic (changes)
        },
    });
};

export const resendEmailVerifyLink = async (token) => {
  return await axiosInstance.post("/auth/resend-verification-email", {
    headers: {
      Authorization: `Bearer ${token}`,
// this is for the verify email from post man 
    },
  });
};

// the below is for verify email account
export const verifyEmailAccount = async (userId, verificationToken, token) => {
  return await axiosInstance.patch(
    `auth/verify-account/${userId}/${verificationToken}`, 
    {
       headers: {
       Authorization: `Bearer ${token}`,
      // this takes in the userIdm verificationToken and token itself 
    },
  });
};
export const sendForgotPasswordMail = async(formData)=> {
    return await axiosInstance.post("/auth/sendforgot-password-mail", formData)
};
// this takes in just the formdata and the link from post man, hence no token, 
// all of these are from the backend 

export const resetPassword = async(userId, passwordToken, formData)=> {
    return axiosInstance.patch(
        `/auth/reset-password/${userId}/{passwordToken}`,
        formData
    );
};
// this is for the resetPassword
