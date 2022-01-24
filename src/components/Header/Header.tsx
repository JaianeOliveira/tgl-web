import {
  Title,
  Header,
  SendButton,
  P,
  SetAccount,
  AccountData,
} from '../../styles/ui';
import { VscArrowRight, VscEdit } from 'react-icons/vsc';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const HeaderBar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const account = useSelector((state) => state.account);
  const [isSetting, setIsSetting] = useState(false);
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
        {location.pathname !== '/home' && (
          <SendButton
            color="gray"
            fontSize={20}
            onClick={() => navigate('/home')}
          >
            Home
          </SendButton>
        )}
      </div>
      <div>
        <SendButton
          color="gray"
          fontSize={20}
          onClick={() => navigate('/account')}
        >
          Account
        </SendButton>

        <SendButton
          color="gray"
          fontSize={20}
          onClick={() => {
            localStorage.removeItem('token');
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
