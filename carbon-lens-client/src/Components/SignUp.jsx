import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser } from 'react-icons/fa';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { MdVpnKey } from 'react-icons/md';
import apiClient from '../services/apiClient';
import useAuthContext from '../hook/useAuthContext';
import { useNavigate } from 'react-router';

const SignUp = () => {

  const {signUp, isSignUp} = useAuthContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: {errors}
  } = useForm();

  const [checkPassword1, setCheckPassword1] = useState(true);
  const password1 = watch("password1");
  const [checkPassword2, setCheckPassword2] = useState(true);
  const [password2, setPassword2] = useState("");

  const selectedCountry = watch("country");

  const [countries, setCountries] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get("/countries/");
        setCountries(res.data);
      } catch (error) {
        console.log("error from sign-up countries", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      (async () => {
        const res = await apiClient.get(`/countries/${selectedCountry}/districts/`);
        setDistricts(res.data);
      })()
    } else {
      setDistricts([]);
      reset({ district: "" });
    }
  }, [selectedCountry, reset]);

  const onSubmit = async ( data ) => {
    try {
      const res = await signUp(data);
      setIsSuccess(res.success);
      setSuccessMsg(res.message);
      navigate("/activities");
    } catch (error) {
      console.log("inside sign-up", error);
    }
  }

  return (
      <form 
        className="sign-up-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="title">Sign Up</h2>

        <p className={`${isSuccess ? "text-green-500": "text-red-500"}`}>{successMsg}</p>

        {/* First name  */}
        <div className="input-field flex items-center justify-center">
          <FaUser className="text-gray-500 text-xl w-full" />
          <input 
            type="text" 
            placeholder="First Name" 
            className="for_all_input"
            {
              ...register("first_name", {required:true})
            }
          />
        </div>
        {
          errors?.first_name && <span className="text-red-500">*This field is Required</span>
        }

        {/* Last Name  */}
        <div className="input-field flex items-center justify-center">
          <FaUser className="text-gray-500 text-xl w-full" />
          <input 
            type="text" 
            placeholder="Last Name" 
            className="for_all_input"
            {
              ...register("last_name", {required:true})
            }
          />
        </div>
        {
          errors?.last_name && <span className="text-red-500">*This field is Required</span>
        }



        {/* User Name  */}
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
          errors?.username && <span className="text-red-500">*This field is Required</span>
        }

        {/* For country & district */}
        <div className='text-stone-600 flex justify-between items-center gap-2'>
          <select
            className='w-full bg-gray-100 rounded-xl'
            {...register("country", { required: true })}
          >
            <option value="" className='p-10 font-bold'>-- Select Country --</option>
            {
              countries && 
                countries.map((country) => (
                  <option key={country.id} value={country.id}>{country.name}</option>
                ))
            }
          </select>

          <select 
            className='w-full bg-gray-100 rounded-xl'
            disabled={!selectedCountry}
            {
              ...register("district", {required: true})
            }
          >
            <option value="" className='p-10 font-bold'>-- Select District --</option>
            {
              districts.map((district) => (
                <option key={district.id} value={district.id}>{district.name}</option>
              ))
            }
          </select>
        </div>
        {
          (errors?.country || errors?.district) && <span className="text-red-500">* Select both Country & District</span>
        }


        {/* For Password 1 */}
        <div className="input-field-password items-center">
          <MdVpnKey className="text-gray-500 text-2xl w-full" />
          <input 
            type={`${!checkPassword1 ? "text" : "password"}`} 
            placeholder="Password" 
            className="for_password"
            {
              ...register("password1", {
                required:"*This Password field is Required",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).{6,}$/,
                  message: "Password must be at least 6 characters, include 1 uppercase letter & 1 digit"
                },
              })
            }
          />
          <button
            type="button"
            onClick={() => setCheckPassword1(!checkPassword1)}
          >
            {
              checkPassword1 ?
                <IoMdEyeOff className="text-gray-500 text-2xl" />
              :
                <IoMdEye className="text-gray-500 text-2xl" />
            }
          </button>
        </div>
        {
          errors?.password1 && <span className="text-red-500">{errors.password1.message}</span>
        }

        {/* For Password 2 */}
        <div className="input-field-password items-center">
          <MdVpnKey className="text-gray-500 text-2xl w-full" />
          <input 
            type={`${!checkPassword2 ? "text" : "password"}`} 
            placeholder="Confirm Password" 
            className="for_password"
            onChange={(e) => setPassword2(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setCheckPassword2(!checkPassword2)}
          >
            {
              checkPassword2 ?
                <IoMdEyeOff className="text-gray-500 text-2xl" />
              :
                <IoMdEye className="text-gray-500 text-2xl" />
            }
          </button>
        </div>
        {
          (password1 && password2 && password1 !== password2) ? <span className="text-red-500">* Password didn't match</span> : ""
        }
        



        <button 
          className="btn solid" 
          type="submit" 
          disabled={password1 !== password2}
        >
          { isSignUp ? <span className="loading loading-dots loading-lg"></span> : "Sign Up"}
        </button>
        {/* //TODO: after clicking sign-up button redirect to Add your devices  */}
      </form>

  );
};

export default SignUp;