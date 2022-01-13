import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Login />} />
    </Routes>
  );
};
export default AuthRoutes;
