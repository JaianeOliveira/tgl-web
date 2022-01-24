import PrivateRoutesLayout from '../components/PrivateRoutesLayout/PrivateRoutesLayout';
import { Title, P, SendButton } from '../styles/ui';
import { VscArrowRight } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setRecentGames } from '../redux/recentGamesSlice';
import { useEffect, useState } from 'react';
import { getRecentGames, myAccount } from '../services/api';
import { useDispatch } from 'react-redux';
import { updateUser } from '../redux/AccountSlice';
import RecentGameItem from '../components/RecentGameItem/RecentGameItem';
import { GameButton } from '../styles/games';
import { GameInfo } from '../types/type';

const Home = () => {
  const gameData = useSelector((state) => state.game);
  const recentGames = useSelector((state) => state.recentGames);
  const account = useSelector((state) => state.account);
  const userData = useSelector((state) => state.auth);
  const [selectedGame, setSelectedGame] = useState<GameInfo | undefined>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log('Recent Games em Home ', recentGames);
  console.log('Account Games em Home ', account);

  useEffect(() => {
    getRecentGames(`${userData.token}`).then((response) => {
      console.log(
        'Recent Games na página de login antes do dispatch',
        response
      );
      dispatch(setRecentGames(response));
    });
    myAccount(`${userData.token}`).then((response) => {
      console.log('account na página de login antes do dispatch', response);
      dispatch(updateUser(response));
    });
  }, [dispatch, userData.token]);
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
