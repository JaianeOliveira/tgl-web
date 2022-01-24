import PrivateRoutesLayout from '../components/PrivateRoutesLayout/PrivateRoutesLayout';
import { useSelector } from 'react-redux';
import { P, Title, Card, SendButton } from '../styles/ui';
import { UserData } from '../styles/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUser, myAccount } from '../services/api';
import { useDispatch } from 'react-redux';
import { updateUser } from '../redux/AccountSlice';
import { VscEdit } from 'react-icons/vsc';
import { alertSucess } from '../components/Alerts/Alerts';
const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector((state) => state.account);
  const userData = useSelector((state) => state.auth);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(account.name);
  const [email, setEmail] = useState(account.email);

  const date = new Date(account.created_at);
  const created_at = `${date.getDate()} / ${
    date.getMonth() + 1
  } ${date.getFullYear()}`;
  console.log(date.toLocaleDateString());

  const setMyUser = async (e: any) => {
    e.preventDefault();
    if (userData.token) {
      const response = await setUser({ email, name }, userData.token);
      await dispatch(updateUser(response));
      setEdit(false);

      alertSucess('Dados alterados com sucesso');
    }
  };

  useEffect(() => {
    if (!account.email) {
      navigate('/home');
    }
  }, [navigate, account.email]);

  return (
    <PrivateRoutesLayout>
      <UserData>
        {account.picture ? (
          <img src={account.picture} />
        ) : (
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
        )}
        <P bold={true} fontSize={25}>
          {account.name}
        </P>
        <P fontSize={18}>{account.email}</P>
        <P>Entrou em {date.toLocaleDateString()}</P>
        {!edit && (
          <button className="edit_userData" onClick={() => setEdit(true)}>
            {' '}
            <VscEdit />
            Edit profile
          </button>
        )}
        {edit && (
          <Card>
            <form onSubmit={setMyUser}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <SendButton type="submit" fontSize={28} color="green">
                Save
              </SendButton>
              <SendButton
                fontSize={24}
                color="gray"
                onClick={() => setEdit(false)}
              >
                Cancel
              </SendButton>
            </form>
          </Card>
        )}
      </UserData>
    </PrivateRoutesLayout>
  );
};

export default Account;
