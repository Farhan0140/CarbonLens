import { Route, Routes } from "react-router";
import UserAuthentication from "../pages/UserAuthentication";
import App from "../App";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route index element={<App />} />
        <Route path="/authentication" element={<UserAuthentication />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;