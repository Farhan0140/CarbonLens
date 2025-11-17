import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";


const useAuth = () => {
  
  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  }

  const [authToken, setAuthToken] = useState( getToken() );

  const [user, setUser] = useState(null);

  useEffect(() => {
    if(authToken)
      fetchUserProfile();
  }, [authToken]);

  const fetchUserProfile = async () => {
    try {
      const response = await apiClient.get("/auth/users/me/");
      setUser(response.data);
    } catch (error) {
      console.log("error from fetchUserProfile ", error);
    }
  }  


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

      if(response) {
        setUser(response.data);
        const res = await signIn({username: data.username, password:data.password1});

        if(res.success) {
          return {
            success: true,
            message: "Sign-Up successful",
          };
        }
      }

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

  const logOut = () => {
    if(authToken) {
      setAuthToken(null);
      setUser(null);
      localStorage.removeItem("authTokens");
    }
  }


  return {
    user,
    authToken,
    signIn,
    isSignIn,
    signUp,
    isSignUp,
    logOut,
  }
};

export default useAuth;