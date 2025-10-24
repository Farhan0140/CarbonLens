import { useState } from "react";
import img1 from '../assets/img/log.svg';
import img2 from '../assets/img/register.svg';
import "./style.css"
import SignIn from "../Components/SignIn";
import SignUp from "../Components/SignUp";


const UserAuthentication = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(true);

  return (
    <div className="flex justify-center items-center">
      <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
        <div className="forms-container">
          <div className="signin-signup">
            
            <SignIn />
            <SignUp />
            
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>Create your free account and begin your experience.</p>
              <button
                className="btn transparent"
                onClick={() => setIsSignUpMode(true)}
              >
                Sign up
              </button>
            </div>
            <img src={img1} className="image" alt="" />
          </div>

          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>We're happy to see you again. Please log in to access your account.</p>
              <button
                className="btn transparent"
                onClick={() => setIsSignUpMode(false)}
              >
                Sign in
              </button>
            </div>
            <img src={img2} className="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuthentication;