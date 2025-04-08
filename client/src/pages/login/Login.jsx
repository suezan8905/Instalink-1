import React from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
// this is for the password visibility
import MetaArgs from "../../components/MetaArgs";
import { loginUser } from "../../api/auth";
import handleError from "../../utils/handleErrors";
import { toast } from "sonner";
import { useAuth } from "../../store";
import { validatePassword, validateUsername } from "../../utils/formValidate";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  //   this is to validate the text input we are designing, it is for the form in the register page.
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();

  const [revealPassword, setRevealPassword] = useState(false); // Track password visibility state

  // Function to toggle password visibility
  const togglePassword = () => {
    setRevealPassword((prev) => !prev);
  };

  const onFormSubmit = async (data) => {
    try {
      const res = await loginUser(data);
      if (res.status === 200) {
        toast.success(res.data.message);
        setAccessToken(res.data.accessToken);
        navigate("/");
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <MetaArgs
        title="Login to InstaShots"
        content="Login to your InstaShots account"
      />

      {/* This is to embed desctiption to our pages, just like going through other pages on chrome   */}

      <div className="w-[90%] md:w-[350px] border rounded-md border-[#A1A1A1] py-[20px] px-[28px] ">
        <div className="flex justify-center ">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        {/* for designing of the form */}

        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="md:max-w-[400px] mx-auto mt-5">
            <label className="floating-label">
              <span>Username</span>
              <input
                type="text"
                placeholder="Username"
                className="input input-lg"
                id="username"
                // the form was gotten from the previous project, it is majorly for the text area.
                {...register("username", {
                  validate: (value) => validateUsername(value),
                })}
              />
            </label>
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
          </div>

          <div className="md:max-w-[400px] mx-auto mt-5">
            <label className="floating-label">
              <span>Password</span>
              <input
                type={revealPassword ? "text" : "password"} //// Toggle password visibility based on state
                placeholder="Password"
                className="input input-lg"
                id="Password"
                // the form was gotten from the previous project, it is majorly for the text area.
                {...register("password", {
                  validate: (value) =>
                     validatePassword(value, "Password is required"),
                })}
              />

              {/* Password toggle button */}
              <button
                className="absolute inset-y-0 right-2 text-sm px-2 pr-2"
                onClick={togglePassword} // Toggle function on click
                type="button"
              >
                {revealPassword ? (
                  <span>Hide</span> // hide password is invisible
                ) : (
                  <span>Show</span> // show password is visible
                )}
              </button>
            </label>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}

            <button className="text-white mt-10 py-2 bg-[#8D0D76] rounded-[7px] border w-full md:max-w-[330px] h-[50px] text-center">
              Log In
            </button>

            <div className="text-center mt-4 mb-4">
              <Link to={"/auth/forgot-password"}>Forgot Password?</Link>
            </div>
          </div>
        </form>
      </div>
      <div>
        <button
          className="text-white mt-7 py-4 border border-[#A1A1A1] rounded-[7px] w-full md:w-[350px] h-[60px] text-center mb-10"
          type="submit"
        >
          <span className="text-[black]">Don't have an account?</span>
          <Link to={"/auth/register"} className="text-[#8D0D76] font-bold">
            {" "}
            Sign Up
          </Link>
        </button>
      </div>
    </>
  );
}
