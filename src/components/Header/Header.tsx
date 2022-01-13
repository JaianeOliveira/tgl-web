import { Title, Header, SendButton } from "../../styles/ui";
import { VscArrowRight } from "react-icons/vsc";
const HeaderBar = () => {
  return (
    <Header>
      <div>
        <div className="name">
          <Title textAlign="center" fontSize={44}>
            TGL
          </Title>
          <div />
        </div>
        <SendButton color="gray" fontSize={20}>
          Home
        </SendButton>
      </div>
      <div>
        <SendButton color="gray" fontSize={20}>
          Account
        </SendButton>
        <SendButton color="gray" fontSize={20}>
          Logout
          <VscArrowRight className="icon" size={28} />
        </SendButton>
      </div>
    </Header>
  );
};

export default HeaderBar;
