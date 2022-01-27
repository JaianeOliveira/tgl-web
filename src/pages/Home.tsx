import PrivateRoutesLayout from '../components/PrivateRoutesLayout/PrivateRoutesLayout';
import { VscArrowRight } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setRecentGames } from '../redux/recentGamesSlice';
import { useEffect, useState } from 'react';
import { getRecentGames } from '../services/api';
import RecentGameItem from '../components/RecentGameItem/RecentGameItem';
import { GameButton } from '../styles/games';
import { Title, P, SendButton } from '../styles/ui';
import { GameInfo } from '../types/type';

const Home = () => {
  const gameData = useSelector((state) => state.game);
  const recentGames = useSelector((state) => state.recentGames);
  const userData = useSelector((state) => state.auth);
  const [selectedGame, setSelectedGame] = useState<GameInfo | undefined>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getRecentGames(`${userData.token}`).then((response) => {
      dispatch(setRecentGames(response));
    });
  }, [dispatch, userData.token]);

  return (
    <PrivateRoutesLayout>
      <div className="home_header">
        <Title fontSize={2.4}>RECENT GAMES</Title>
        <div className="filter_div">
          <P italic={true} style={{ marginRight: 15 }}>
            Filters
          </P>
          <div>
            {gameData.types.map((item) => (
              <GameButton
                key={item.id}
                color={item.color}
                onClick={() => {
                  if (selectedGame?.type === item.type) {
                    setSelectedGame(undefined);
                  } else {
                    setSelectedGame(item);
                  }
                }}
                style={{
                  backgroundColor: `${
                    selectedGame?.type === item.type ? item.color : 'inherit'
                  }`,
                  color: `${
                    selectedGame?.type === item.type ? '#FFF' : item.color
                  }`,
                }}
              >
                {item.type}
              </GameButton>
            ))}
          </div>
        </div>
        <SendButton color="green" onClick={() => navigate('/new-bet')}>
          New Bet <VscArrowRight className="icon" />
        </SendButton>
      </div>
      <div className="recentGames">
        {recentGames.length === 0 && (
          <P italic={true}>You have no recent games</P>
        )}
        {recentGames.length > 0 &&
          !selectedGame &&
          recentGames.map((item) => (
            <RecentGameItem
              key={item.id}
              numbers={item.choosen_numbers}
              date={item.created_at}
              price={item.price}
              game={item.type.type}
            />
          ))}
        {recentGames.length > 0 &&
          selectedGame &&
          recentGames.map((item) => {
            if (item.type.type === selectedGame.type) {
              return (
                <RecentGameItem
                  key={item.id}
                  numbers={item.choosen_numbers}
                  date={item.created_at}
                  price={item.price}
                  game={item.type.type}
                />
              );
            }
          })}
      </div>
    </PrivateRoutesLayout>
  );
};

export default Home;
