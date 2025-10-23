import { useForm } from 'react-hook-form';

const SignUp = () => {

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();

  const onSubmit = ( data ) => {
    console.log(data);
  }

  return (
    <form 
      className="sign-up-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="title">Sign up</h2>
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
        errors.userName && <span className="text-red-500">*This Username field is Required</span>
      }
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input 
          type="password" 
          placeholder="Password" 
          {
            ...register("password1", {required:true})
          }
        />
      </div>
      {
        errors?.password1 && <span className="text-red-500">*This Password field is Required</span>
      }
      <button className="btn solid" type="submit" >Sign up</button>
      {/* //TODO: after clicking sign-up button redirect to Add your devices  */}
    </form>
  );
};

export default SignUp;