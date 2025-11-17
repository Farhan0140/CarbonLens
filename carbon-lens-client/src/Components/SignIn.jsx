import { useForm } from "react-hook-form";
import useAuthContext from "../hook/useAuthContext";
import { FaUser } from "react-icons/fa";
import { MdVpnKey } from "react-icons/md";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router";

const SignIn = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();

  const { signIn, isSignIn } = useAuthContext()
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [checkPassword, setCheckPassword] = useState(true);

  const onSubmit = async ( data ) => {
    try {

      const res = await signIn(data);
      setIsSuccess(res.success);
      setSuccessMsg(res.message);
      if(res.success) {
        navigate("/");
      }

    } catch (error) {
      console.log("Inside signIn jsx\n", error);
    }
  }

  return (
    <form 
      className="sign-in-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="title">Sign in</h2>
      <p className={`${isSuccess ? "text-green-500": "text-red-500"}`}>{successMsg}</p>
      <div className="input-field flex items-center justify-center">
        <FaUser className="text-gray-500 text-xl w-full" />
        <input 
          type="text" 
          placeholder="Username or Email" 
          className="for_all_input"
          {
            ...register("username", {required:true})
          }
        />
      </div>
      {
        errors?.username && <span className="text-red-500">*This Username field is Required</span>
      }
      <div className="input-field-password items-center">
        <MdVpnKey className="text-gray-500 text-2xl w-full" />
        <input 
          type={`${!checkPassword ? "text" : "password"}`} 
          placeholder="Password" 
          className="for_password"
          {
            ...register("password", {required:true})
          }
        />
        <button
          type="button"
          onClick={() => setCheckPassword(!checkPassword)}
        >
          {
            checkPassword ?
              <IoMdEyeOff className="text-gray-500 text-2xl" />
            :
              <IoMdEye className="text-gray-500 text-2xl" />
          }
        </button>
      </div>
      {
        errors?.password && <span className="text-red-500">*This Password field is Required</span>
      }
      <button 
        className="btn solid" 
        type="submit" 
        disabled={isSignIn}
      >
        { isSignIn ? <span className="loading loading-dots loading-lg"></span> : "Log in"}
      </button>
    </form>
  );
};

export default SignIn;