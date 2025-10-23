import apiClient from "../services/apiClient";


const useAuth = () => {

  const signIn = async (data) => {
    try {
      const response = await apiClient.post("/auth/jwt/create/", {
        username: data.userName,
        password: data.password,
      });

      if(response) {
        console.log("Loged in successful\n", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }


  return {
    signIn,
  }
};

export default useAuth;