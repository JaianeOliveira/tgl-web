import PrivateRoutesLayout from "../components/PrivateRoutesLayout/PrivateRoutesLayout";
import { Title, P, SendButton, GameButton } from "../styles/ui";
import { VscArrowRight } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RecentGameItem from "../components/RecentGameItem/RecentGameItem";
import { setRecentGames } from "../redux/recentGamesSlice";
import { useEffect } from "react";
import { getRecentGames } from "../services/api";
import { useDispatch } from "react-redux";

const Home = () => {
  const gameData = useSelector((state) => state.game);
  const recentGames = useSelector((state) => state.recentGames);
  const userData = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(gameData);

  useEffect(() => {
    getRecentGames(userData.token).then((response) =>
      dispatch(setRecentGames(response))
    );
  }, [dispatch, userData.token]);

  return (
    <PrivateRoutesLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex" }}>
          <Title fontSize={24}>RECENT GAMES</Title>
          {recentGames.length !== 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginLeft: 40,
              }}
            >
              <P italic={true}>Filters</P>
              {gameData.types.map((item) => (
                <GameButton key={item.id} color={item.color}>
                  {item.type}
                </GameButton>
              ))}
            </div>
          )}
        </div>
        <SendButton color="green" onClick={() => navigate("/new-bet")}>
          New Bet <VscArrowRight className="icon" />
        </SendButton>
      </div>
      <div>
        {recentGames.length === 0 && (
          <P italic={true}>You have no recent games</P>
        )}
        {recentGames.length !== 0 &&
          recentGames.map((item) => console.log(item))}
      </div>
    </PrivateRoutesLayout>
  );
};

export default Home;
