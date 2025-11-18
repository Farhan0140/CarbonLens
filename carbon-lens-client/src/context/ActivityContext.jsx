import { createContext } from "react";
import useActivities from "../hook/useActivities";


const ActivityContext = createContext() 

export const ActivityProvider = ({ children }) => {

  const allContext = useActivities()

  return (
    <ActivityContext.Provider value={allContext}>
      {children}
    </ActivityContext.Provider>
  );
};

export default ActivityContext;