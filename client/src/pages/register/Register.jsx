import logo from "../../assets/logo.png";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
// this is done to validate input field from cdn hook form.
import { useState } from "react";
// this is for the password visibility
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validatefullname,
} from "../../utils/formValidate";
// This is for validating the email, password, username and fullname

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  //   this is to validate the text input we are designing, it is for the form in the register page.

  const [revealPassword, setRevealPassword] = useState(false); // Track password visibility state

  // Function to toggle password visibility
  const togglePassword = () => {
    setRevealPassword((prev)=> !prev);
  };

  return (
    <>
      <div className="w-[90%] md:w-[350px] border rounded-md border-[#A1A1A1] py-[20px] px-[28px] ">
        <div className="flex justify-center ">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        {/* for designing of the form */}

        <form onSubmit={handleSubmit()}>
          <div className="md:max-w-[400px] mx-auto mt-10 ">
            <label className="floating-label">
              <span>Username</span>
              <input
                type="text"
                placeholder="Email"
                className="input input-lg"
                id="Email"
                // the form was gotten from the previous project, it is majorly for the text area.
                {...register("email", {
                  validate: (value) => validateEmail(value),
                })}
                // the above is for validating the email
              />
            </label>
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="md:max-w-[400px] mx-auto mt-5">
            <label className="floating-label">
              <span>Fullname</span>
              <input
                type="text"
                placeholder="Fullname"
                className="input input-lg"
                id="Fullname"
                // the form was gotten from the previous project, it is majorly for the text area.
                {...register("fullname", {
                  validate: (value) => validatefullname(value),
                })}
              />
            </label>
            {errors.fullname && (
              <span className="text-red-500">{errors.fullname.message}</span>
            )}
          </div>

          <div className="md:max-w-[400px] mx-auto mt-5">
            <label className="floating-label">
              <span>Username</span>
              <input
                type="text"
                placeholder="Username"
                className="input input-lg"
                id="Username"
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
              <span>Username</span>
              <input
                type={revealPassword ? "text" : "password"} //// Toggle password visibility based on state
                placeholder="Password"
                className="input input-lg"
                id="Password"
                // the form was gotten from the previous project, it is majorly for the text area.
                {...register("password", {
                  validate: (value) => validatePassword(value),
                })}
              />

              {/* Password toggle button */}
              <button
                className="absolute inset-y-0 right-2 text-sm px-2 pr-8"
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
              Sign Up
            </button>

            <h1 className="mt-2 text-center md:max-w-[300px] mb-4 text-sm">
              By signing up, you agree to our Term, data and <br />
              policy
            </h1>
          </div>
        </form>
      </div>
      <div>
        <button
          className="text-white mt-7 py-4 border border-[#A1A1A1] rounded-[7px] w-full md:w-[350px] h-[60px] text-center mb-10"
          type="submit"
        >
          <span className="text-[black]">Already have an account?</span>
          <span className="text-[#8D0D76] font-bold"> Log In</span>
        </button>
      </div>
    </>
  );
}
