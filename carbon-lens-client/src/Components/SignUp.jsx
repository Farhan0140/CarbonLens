import { useForm } from 'react-hook-form';
import { FaUser } from 'react-icons/fa';
import { MdVpnKey } from 'react-icons/md';

const SignUp = () => {

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();

  const onSubmit = ( data ) => {
    console.log("Inside sign-up", data);
  }

  return (
      <form 
        className="sign-up-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="title">Sign Up</h2>
        {/* <p className={`${isSuccess ? "text-green-500": "text-red-500"}`}>{successMsg}</p> */}
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
            // type={`${!checkPassword ? "text" : "password"}`} 
            placeholder="Password" 
            className="for_password"
            {
              ...register("password", {required:true})
            }
          />
          <button
            type="button"
            // onClick={() => setCheckPassword(!checkPassword)}
          >
            {/* {
              checkPassword ?
                <IoMdEyeOff className="text-gray-500 text-2xl" />
              :
                <IoMdEye className="text-gray-500 text-2xl" />
            } */}
          </button>
        </div>
        {
          errors?.password && <span className="text-red-500">*This Password field is Required</span>
        }
        <button 
          className="btn solid" 
          type="submit" 
          // disabled={isSignIn}
        >
          Sign Up
          {/* { isSignIn ? <span className="loading loading-dots loading-lg"></span> : "Log in"} */}
        </button>
        {/* //TODO: after clicking sign-up button redirect to Add your devices  */}
      </form>

  );
};

export default SignUp;