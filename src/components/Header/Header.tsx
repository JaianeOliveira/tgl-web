import { Title, Header, SendButton, P } from "../../styles/ui";
import { VscArrowRight } from "react-icons/vsc";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement("#root");

const HeaderBar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Header>
      <div>
        <div className="name">
          <Title textAlign="center" fontSize={44}>
            TGL
          </Title>
          <div />
        </div>
        {location.pathname !== "/home" && (
          <SendButton
            color="gray"
            fontSize={20}
            onClick={() => navigate("/home")}
          >
            Home
          </SendButton>
        )}
      </div>
      <div>
        <SendButton
          color="gray"
          fontSize={20}
          onClick={() => setModalIsOpen(true)}
        >
          Account
        </SendButton>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            },
            content: {
              position: "absolute",
              top: "20%",
              left: "20%",
              border: "1px solid #ccc",
              background: "#fff",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "4px",
              outline: "none",
              padding: "20px",
              height: "60vh",
              width: "60vw",
            },
          }}
        >
          <Title fontSize={28}>Account</Title>
          <div>
            <P bold={true}>Username</P>
            <P>fulanodital</P>
          </div>
        </Modal>
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
