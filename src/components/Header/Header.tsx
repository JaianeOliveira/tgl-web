import { Title, Header, SendButton, P, SetAccount } from '../../styles/ui';
import { VscArrowRight, VscEdit } from 'react-icons/vsc';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import { AccountData } from '../../styles/ui';

Modal.setAppElement('#root');

const HeaderBar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const account = useSelector((state) => state.account);
  const [isSetting, setIsSetting] = useState(false);
  console.log('account', account);
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
          onClick={() => setModalIsOpen(true)}
        >
          Account
        </SendButton>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            },
            content: {
              position: 'absolute',
              top: '20%',
              left: '20%',
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '20px',
              height: '60vh',
              width: '60vw',
            },
          }}
        >
          <Title fontSize={28}>Account</Title>
          <AccountData>
            <div className="profilePhoto">
              <img
                src={
                  account.picture ||
                  'https://luby-timesheet.azurewebsites.net/Content/neon/assets/images/thumb-1@2x.png'
                }
                alt="profileImg"
              />
            </div>

            <div className="label">
              <P fontSize={22} bold={true}>
                {account.name}
              </P>
              <P>{account.email}</P>
            </div>
            <button onClick={() => setIsSetting(true)}>
              <VscEdit />
            </button>
          </AccountData>
          {isSetting && (
            <SetAccount>
              <input type="text" value={account.name} />
              <input type="email" value={account.email} />
              <button className="save" onClick={(e) => e.preventDefault()}>
                Save
              </button>
              <button className="cancel" onClick={() => setIsSetting(false)}>
                Cancel
              </button>
            </SetAccount>
          )}
        </Modal>
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
