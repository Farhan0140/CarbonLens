import { Route, Routes } from "react-router";
import UserAuthentication from "../pages/UserAuthentication";
import App from "../App";
import AllActivities from "../pages/AllActivities";
import MainLayout from "../Layouts/MainLayout";

const AppRoutes = () => {
  return (
    <div>
      <Routes>

        <Route element={<MainLayout />}>
          <Route index element={<App />} />
          <Route path="/authentication" element={<UserAuthentication />} />
          <Route path="/activities" element={<AllActivities />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;