import { Title, Header, SendButton } from "../../styles/ui";
import { VscArrowRight } from "react-icons/vsc";

import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
const HeaderBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        <SendButton
          color="gray"
          fontSize={20}
          onClick={() => {
            localStorage.removeItem("token");
            dispatch(logout());
            document.location.reload();
          }}
        >
          Logout
          <VscArrowRight className="icon" size={28} />
        </SendButton>
      </div>
    </Header>
  );
};

export default HeaderBar;
