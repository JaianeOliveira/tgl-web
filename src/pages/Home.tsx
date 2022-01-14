import PrivateRoutesLayout from "../components/PrivateRoutesLayout/PrivateRoutesLayout";
import { Title, P, SendButton } from "../styles/ui";
import GameButtons from "../components/GameButtons/GameButtons";
import { VscArrowRight } from "react-icons/vsc";

const Home = () => {
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
            <GameButtons />
          </div>
        </div>
        <SendButton color="green">
          New Bet <VscArrowRight className="icon" />
        </SendButton>
      </div>
      <div></div>
    </PrivateRoutesLayout>
  );
};

export default Home;
