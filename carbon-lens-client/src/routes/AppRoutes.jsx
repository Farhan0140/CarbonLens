import { Route, Routes } from "react-router";
import UserAuthentication from "../pages/UserAuthentication";
import App from "../App";
import AllActivities from "../pages/AllActivities";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route index element={<App />} />
        <Route path="/authentication" element={<UserAuthentication />} />
        <Route path="/activities" element={<AllActivities />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;