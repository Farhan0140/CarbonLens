import { useContext } from "react";
import ActivityContext from "../context/ActivityContext";

const useActivityContext = () => {
  return useContext(ActivityContext)
};

export default useActivityContext;