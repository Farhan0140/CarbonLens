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


  return {
    signIn,
    isSignIn,
  }
};

export default useAuth;