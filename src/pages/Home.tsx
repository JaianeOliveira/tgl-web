import PrivateRoutesLayout from "../components/PrivateRoutesLayout/PrivateRoutesLayout";
import { Title, P, SendButton, GameButton } from "../styles/ui";
import { VscArrowRight } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const gameData = useSelector((state) => state.game);
  const navigate = useNavigate();
  console.log(gameData);
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
        </div>
        <SendButton color="green" onClick={() => navigate("/new-bet")}>
          New Bet <VscArrowRight className="icon" />
        </SendButton>
      </div>
      <div></div>
    </PrivateRoutesLayout>
  );
};

export default Home;
