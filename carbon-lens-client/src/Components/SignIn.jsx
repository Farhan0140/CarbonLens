import { useForm } from "react-hook-form";
import useAuthContext from "../hook/useAuthContext";

const SignIn = () => {

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();

  const {signIn} = useAuthContext()

  const onSubmit = async ( data ) => {
    try {

      await signIn(data)

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
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input 
          type="text" 
          placeholder="Username" 
          {
            ...register("userName", {required:true})
          }
        />
      </div>
      {
        errors?.userName && <span className="text-red-500">*This Username field is Required</span>
      }
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input 
          type="password" 
          placeholder="Password" 
          {
            ...register("signInPassword", {required:true})
          }
        />
      </div>
      {
        errors?.signInPassword && <span className="text-red-500">*This Password field is Required</span>
      }
      <button className="btn solid" type="submit" >Log in</button>
    </form>
  );
};

export default SignIn;