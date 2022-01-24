import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../redux/authSlice';
import { VscArrowRight } from 'react-icons/vsc';
import { Title, Header, SendButton } from '../../styles/ui';

const HeaderBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Header>
      <div className="name">
        <Title textAlign="center" fontSize={4.4}>
          TGL
        </Title>
        <div />
      </div>
      <div>
        {location.pathname !== '/home' && (
          <SendButton
            color="gray"
            fontSize={2}
            onClick={() => navigate('/home')}
          >
            Home
          </SendButton>
        )}
        <SendButton
          color="gray"
          fontSize={2}
          onClick={() => navigate('/account')}
        >
          Account
        </SendButton>

        <SendButton
          color="gray"
          fontSize={2}
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
