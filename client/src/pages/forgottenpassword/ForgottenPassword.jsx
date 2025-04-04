import logo from "../../assets/logo.png";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
// this is done to validate input field from cdn hook form.
import { useState } from "react";
// this is for the password visibility
import MetaArgs from "../../components/MetaArgs";
import { validateEmail } from "../../utils/formValidate";



export default function ForgottenPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  //   this is to validate the text input we are designing, it is for the form in the register page.

  const [revealPassword, setRevealPassword] = useState(false); // Track password visibility state

  // Function to toggle password visibility
  const togglePassword = () => {
    setRevealPassword((prev) => !prev);
  };

  return (
    <>
      <MetaArgs
        title="Sign up to InstaShots"
        content="Get access to InstaShots"
      />
      <div className="w-[90%] md:w-[350px] border rounded-md border-[#A1A1A1] py-[20px] px-[28px] ">
        <div className="text-center mt-4 mb-4 text-xl">
          <h1> Forgotten Password</h1>
          <p className="justify-center text-center mt-5 text-base  text-justify">
            When you fill in your correct details on both the register and
            login, we'll send you instructions on how to reset the password
          </p>
        </div>
        {/* for the forgotten password */}

        <form onSubmit={handleSubmit()}>
          <div className="md:max-w-[400px] mx-auto mt-10 ">
            <label className="floating-label">
              <span>Username</span>
              <input
                type="text"
                placeholder="Enter Email"
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

          <div className="md:max-w-[400px] mx-auto ">
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}

            <button className="text-white mt-5 py-2 bg-[#8D0D76] rounded-[7px] border w-full md:max-w-[330px] h-[50px] text-center mb-2">
              Reset my Password
            </button>
          </div>
        </form>
      </div>
      <div>
        <button className="text-white mt-5 py-4 border border-[#A1A1A1] rounded-[7px] w-full md:w-[350px] h-[80px] text-center mb-10 ">
          <span className="text-black">
            Already have an account?
            <span className="text-[#8D0D76] font-bold"> Login</span>
          </span>
          <br />
          <div className="mt-2 mb-2">
            <span className="text-black">
              New User?<span className="text-[#8D0D76] font-bold"> Sign Up</span>
            </span>
          </div>
        </button>
      </div>
    </>
  );
}

// LAZY LOADING AND CODE SPLITING: are performance technique that work together to improve web application speed
