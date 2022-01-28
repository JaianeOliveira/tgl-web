import PrivateRoutesLayout from '../../components/PrivateRoutesLayout';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../services/api';
import { updateUser } from '../../redux/AccountSlice';
import { VscEdit } from 'react-icons/vsc';
import { AlertError, AlertSuccess } from '../../components';
import { P, Card, SendButton } from '../../styles/ui';
import { UserData } from '../../styles/auth';

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector((state) => state.account);
  const userData = useSelector((state) => state.auth);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(account.name);
  const [email, setEmail] = useState(account.email);
  const date = new Date(account.created_at);

  const emailValidator = (email: string) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const created_at = `${date.getDate()} / ${
    date.getMonth() + 1
  } ${date.getFullYear()}`;

  const setMyUser = async (e: any) => {
    e.preventDefault();
    if (userData.token) {
      if (emailValidator(email)) {
        const response = await setUser({ email, name }, userData.token);
        await dispatch(updateUser(response));
        setEdit(false);
        AlertSuccess('Dados alterados com sucesso');
      } else {
        AlertError('Digite um email válido.');
      }
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
        <P bold={true} fontSize={2.5}>
          {account.name}
        </P>
        <P fontSize={1.8}>{account.email}</P>
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
              <SendButton type="submit" fontSize={2.8} color="green">
                Save
              </SendButton>
              <SendButton
                fontSize={2.4}
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
