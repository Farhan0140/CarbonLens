import { useState } from "react";
import apiClient from "../services/apiClient";


const useAuth = () => {

  const [authToken, setAuthToken] = useState();


  // Sign-IN
  const [isSignIn, setIsSignIn] = useState(false);

  const signIn = async (data) => {
    setIsSignIn(true);

    try {
      const response = await apiClient.post("/auth/jwt/create/", data);

      setAuthToken(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));

      return {
        success: true,
        message: "logged-in successful",
      };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.detail,
      };
      // console.log(error);
    } finally {
      setIsSignIn(false);
    }
  }


  // Sign-UP
  const [isSignUp, setIsSignUp] = useState(false);

  const signUp = async (data) => {
    setIsSignUp(true);

    try {
      const response = await apiClient.post("/auth/users/", {
        username: data.username,
        first_name: data.first_name,
        last_name: data.last_name,
        country: data.country,
        district: data.district,
        password: data.password1
      });
      
      console.log(response.data);

      return {
        success: true,
        message: "Sign-Up successful",
      };
    } catch (error) {
      const data = error?.response?.data || {};
      let messages = [];

      // loop through all fields
      for (let key in data) {
        if (Array.isArray(data[key])) {
          messages.push(`${key}: ${data[key].join(", ")}`);
        } else {
          messages.push(`${key}: ${data[key]}`);
        }
      }

      return {
        success: false,
        message: messages.join(" | "), // combine all errors in one string
      };
    } finally {
      setIsSignUp(false);
    }
  }


  return {
    authToken,
    signIn,
    isSignIn,
    signUp,
    isSignUp,
  }
};

export default useAuth;