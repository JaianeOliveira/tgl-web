import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getData } from './redux/gameSlice';
import { getGameData } from './services/api';
import Home from './pages/Home';
import Login from './pages/Login';
import NewBet from './pages/NewBet/NewBet';
import Account from './pages/Account';
import Admin from './pages/Admin';

const App = () => {
  const authSelector = useSelector((state) => state.auth);
  const account = useSelector((state) => state.account);
  const dispatch = useDispatch();
  useEffect(() => {
    getGameData().then((response) => {
      dispatch(getData(response));
    });
  }, [dispatch]);

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
      <Route
        path="/account"
        element={authSelector.token ? <Account /> : <Navigate to="/login" />}
      />
      <Route
        path="/games"
        element={
          authSelector.token && account.is_admin ? (
            <Admin />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};

export default App;
