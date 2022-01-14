import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

import { useSelector } from "react-redux";
import { RootState } from "./redux";

const App = () => {
  const authSelector = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={
          authSelector.token !== null ? <Home /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
};

export default App;
