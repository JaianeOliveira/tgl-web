import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
  const token = true;
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={token ? <Home /> : <Navigate to="/" />} />
    </Routes>
  );
};

export default App;
