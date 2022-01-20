import PrivateRoutesLayout from '../components/PrivateRoutesLayout/PrivateRoutesLayout';
import { Title, P, SendButton } from '../styles/ui';
import { VscArrowRight } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setRecentGames } from '../redux/recentGamesSlice';
import { useEffect } from 'react';
import { getRecentGames } from '../services/api';
import { useDispatch } from 'react-redux';
import GameSelect from '../components/GameSelect/GameSelect';

const Home = () => {
  const gameData = useSelector((state) => state.game);
  const recentGames = useSelector((state) => state.recentGames);
  const userData = useSelector((state) => state.auth);
  const account = useSelector((state) => state.account);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getRecentGames(userData.token).then((response) =>
      dispatch(setRecentGames(response))
    );
  }, [dispatch, userData.token]);

  console.log(recentGames);
  return (
    <PrivateRoutesLayout>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex' }}>
          <Title fontSize={24}>RECENT GAMES</Title>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginLeft: 40,
            }}
          >
            <P italic={true} style={{ marginRight: 15 }}>
              Filters
            </P>
            <GameSelect />
          </div>
        </div>
        <SendButton color="green" onClick={() => navigate('/new-bet')}>
          New Bet <VscArrowRight className="icon" />
        </SendButton>
      </div>
      <div>
        {recentGames.length === 0 && (
          <P italic={true}>You have no recent games</P>
        )}
        {recentGames.length !== 0 &&
          recentGames.map((item) => <P>{item.choosen_numbers}</P>)}
      </div>
    </PrivateRoutesLayout>
  );
};

export default Home;
