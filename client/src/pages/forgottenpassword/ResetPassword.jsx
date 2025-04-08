import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import MetaArgs from "../../components/MetaArgs";
// import logo from "../../assets/logo.png";
import { validatePassword } from "../../utils/formValidate";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "sonner";
import handleError from "../../utils/handleErrors";
import { resetPassword } from "../../api/auth";

export default function ResetPassword() {
  const [revealPassword, setRevealPassword] = useState(false);
  const { userId, passwordToken } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const togglePassword = () => {
    setRevealPassword((prev) => !prev);
  };

  const onFormSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      // validation for the password
      toast.error("New password and confirm password do not match", {
        id: "ResetPassword",
    });
      return;
    }
    try {
        const res = await resetPassword(userId, passwordToken, data); //resetPassword was imported from our API
        if(res.status === 200) {
            toast.success(res.data.message);
            navigate("/auth/login");
        }
    } catch (error) {
        handleError(error);
    }
  };

  return (
    <>
      <MetaArgs
        title="Reset your InstaShots password"
        content="Reset password page"
      />

      <div className="w-[90%] md:w-[350px] border rounded-md border-[#A1A1A1] py-[20px] px-[28px] ">
        <div className="text-center mt-4 mb-4 text-xl">
          <Link to="/"></Link>
          <h1>Reset your Password</h1>
        </div>
        {/* for the forgotten password */}
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="md:max-w-[400px] mx-auto mt-5">
            <label className="floating-label">
              <span>New Password</span>
              <input
                type={revealPassword ? "text" : "password"} //// Toggle password visibility based on state
                placeholder="New Password"
                className="input input-md w-full"
                id="newPassword"
                // the form was gotten from the previous project, it is majorly for the text area.
                {...register("newPassword", {
                  validate: (value) => 
                validatePassword(value, "New password is required"),
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
            {errors.newPassword && (
              <span className="text-red-500">{errors.newPassword.message}</span>
            )}
          </div>

          {/* duplicate div below */}

          <div className="md:max-w-[400px] mx-auto mt-5">
            <label className="floating-label">
              <span>confirm Password</span>
              <input
                type={revealPassword ? "text" : "password"} //// Toggle password visibility based on state
                placeholder="confirmPassword"
                className="input input-md w-full"
                id="confirmPassword"
                // the form was gotten from the previous project, it is majorly for the text area.
                {...register("confirmPassword", {
                  validate: (value) => 
                  validatePassword(value, "Confirm password is required"),
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
            {errors.confirmPassword && (
              <span className="text-red-500">
                {" "}
                {errors.confirmPassword.message}{" "}
              </span>
              //{errors.confirmPassword.message} this is done to enalble the password have one caplog
            )}
          </div>

          <div className="md:max-w-[400px] mx-auto ">
            <button
              className="text-white mt-5 py-2 bg-[#8D0D76] rounded-[7px] border w-full md:max-w-[330px] h-[50px] text-center mb-2"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Reset  Password"
              )}
            </button>
          </div>
        </form>
      </div>

      <div>
        <button className="text-white mt-5 py-4 border border-[#A1A1A1] rounded-[7px] w-full md:w-[350px] h-[80px] text-center mb-10 ">
          <span className="text-black">
            Already have an account?
            <Link to={"/auth/login"} className="text-[#8D0D76] font-bold">
              {" "}
              Login
            </Link>
          </span>
          <br />
        </button>
      </div>
    </>
  );
}

{
  /* // note, we use curly bracket directely when we want to dis-structure the props 
// "Reset your InstaShots password" and this {"Reset your InstaShots password"} is when we want to pass a vaiable hence the cutly braket is sed for that purpost  */
}
