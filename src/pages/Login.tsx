import { useState } from 'react';
import AuthPageTitle from '../components/AuthPageTitle/AuthPageTitle';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { loginFetch, newUser, sendLink, resetPassword } from '../services/api';
import { VscArrowRight, VscArrowLeft } from 'react-icons/vsc';
import { updateUser } from '../redux/AccountSlice';
import { alertError, alertSucess } from '../components/Alerts/Alerts';
import { AuthCard, AuthInput, AuthPageLayout } from '../styles/auth';
import { Title, SendButton } from '../styles/ui';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [forgetPassword, setForgetPassword] = useState(false);
  const [resetPasswordToken, setResetPasswordToken] = useState('');
  const [registration, setRegistration] = useState(false);

  const emailHandler = (e: any) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e: any) => {
    setPassword(e.target.value);
  };

  const nameHandler = (e: any) => {
    setName(e.target.value);
  };

  const forgetPasswordHandler = (e: any) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
    setName('');
    setForgetPassword(true);
  };

  const signupHandler = (e: any) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
    setName('');
    setRegistration(true);
  };

  const emailValidator = (email: string) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const passwordValidator = (password: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const sendLinkHandler = async (e: any) => {
    e.preventDefault();
    if (emailValidator(email)) {
      await sendLink(email)
        .then((response) => {
          setResetPasswordToken(response.token);
          setForgetPassword(false);
          setEmail('');
        })
        .catch((error) => alertError(error.response.data.message));
    } else {
      alertError('Digite um email válido.');
    }
  };

  const resetPasswordHandler = async (e: any) => {
    e.preventDefault();
    if (passwordValidator(password)) {
      await resetPassword(resetPasswordToken, password)
        .then(async (response) => {
          await dispatch(updateUser(response));
          setResetPasswordToken('');
          setPassword('');
          alertSucess('Senha alterada com sucesso');
        })
        .catch((error) => {
          alertError(error.response.data.message);
        });
    } else {
      alertError(
        'Digite uma senha válida. É necessário pelo menos oito caracteres sendo eles pelo menos um número e uma letra.'
      );
    }
  };

  const loginHandler = async (e: any) => {
    let token = '';
    e.preventDefault();
    await loginFetch({ email, password })
      .then((response) => {
        token = response.token.token;
        dispatch(
          login({
            email: response.user.email,
            user: response.user.name,
            token: response.token.token,
          })
        );
      })
      .then(async () => {
        setPassword('');
        setEmail('');
        navigate('/home');
      })
      .catch((error) => {
        alertError(error.response.data.message);
      });
  };

  const registerHandler = (e: any) => {
    e.preventDefault();
    if (emailValidator(email)) {
      if (passwordValidator(password)) {
        newUser({ email, password, name })
          .then(() => {
            alertSucess('Usuário criado com sucesso');
            setEmail('');
            setPassword('');
            setName('');
            setRegistration(false);
          })
          .catch((error) => {
            alertError(error.reponse.data.message);
          });
      } else {
        alertError(
          'Digite uma senha válida. É necessário pelo menos oito dígitos sendo pelo menos um número e uma letra.'
        );
      }
    } else {
      alertError('Digite um email válido');
    }
  };

  return (
    <AuthPageLayout>
      <section>
        <AuthPageTitle />
      </section>
      <section>
        {!forgetPassword && !registration && !resetPasswordToken && (
          <>
            <Title textAlign="center" fontSize={3.5}>
              Authentication
            </Title>
            <form onSubmit={loginHandler}>
              <AuthCard>
                <AuthInput
                  type="email"
                  placeholder="Email"
                  onChange={emailHandler}
                  value={email}
                />
                <AuthInput
                  type="password"
                  placeholder="Password"
                  onChange={passwordHandler}
                  value={password}
                />
                <button
                  type="button"
                  className="forgetPassword"
                  onClick={forgetPasswordHandler}
                >
                  I forget my password
                </button>
                <SendButton type="submit" color="green">
                  Log In <VscArrowRight className="icon" />
                </SendButton>
              </AuthCard>
            </form>
            <SendButton color="gray" onClick={signupHandler}>
              Sign Up <VscArrowRight className="icon" />
            </SendButton>
          </>
        )}
        {forgetPassword && (
          <>
            <Title textAlign="center" fontSize={3.5}>
              Reset Password
            </Title>
            <form>
              <AuthCard>
                <AuthInput
                  type="email"
                  placeholder="Email"
                  onChange={emailHandler}
                  value={email}
                />
                <SendButton color="green" onClick={sendLinkHandler}>
                  Send Link <VscArrowRight className="icon" />
                </SendButton>
              </AuthCard>
            </form>
            <SendButton color="gray" onClick={() => setForgetPassword(false)}>
              <VscArrowLeft className="icon" />
              Back
            </SendButton>
          </>
        )}
        {resetPasswordToken && (
          <>
            <Title textAlign="center" fontSize={3.5}>
              Reset Password
            </Title>
            <form>
              <AuthCard>
                <AuthInput
                  type="text"
                  placeholder="New Password"
                  onChange={passwordHandler}
                  value={password}
                />
                <SendButton color="green" onClick={resetPasswordHandler}>
                  Reset Password <VscArrowRight className="icon" />
                </SendButton>
              </AuthCard>
            </form>
          </>
        )}
        {registration && (
          <>
            <Title textAlign="center" fontSize={3.5}>
              Registration
            </Title>
            <form>
              <AuthCard>
                <AuthInput
                  type="text"
                  placeholder="Name"
                  onChange={nameHandler}
                  value={name}
                />
                <AuthInput
                  type="email"
                  placeholder="Email"
                  onChange={emailHandler}
                  value={email}
                />
                <AuthInput
                  type="password"
                  placeholder="Password"
                  onChange={passwordHandler}
                  value={password}
                />
                <SendButton color="green" onClick={registerHandler}>
                  Register <VscArrowRight className="icon" />
                </SendButton>
              </AuthCard>
            </form>
            <SendButton color="gray" onClick={() => setRegistration(false)}>
              <VscArrowLeft className="icon" /> Back
            </SendButton>
          </>
        )}
      </section>
    </AuthPageLayout>
  );
};

export default Login;
