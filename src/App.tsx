import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewBet from "./pages/NewBet";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getData } from "./redux/gameSlice";
import { useDispatch } from "react-redux";
import { getGameData } from "./services/api";
const App = () => {
  const authSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    getGameData().then((response) => dispatch(getData(response)));
  }, []);

  return (
    <Routes>
      <Route
        path="/login"
        element={!authSelector.token ? <Login /> : <Navigate to="/home" />}
      />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route
        path="/home"
        element={authSelector.token ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/new-bet"
        element={authSelector.token ? <NewBet /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default App;
