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
import LoginForm from '../components/Forms/LoginForm';
import ResetPassword from '../components/Forms/ResetPassword';
import NewPassword from '../components/Forms/NewPassword';
import Registration from '../components/Forms/Registration';

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

  const setForgetPasswordHandler = (e: any) => {
    e.preventDefault();
    setForgetPassword(false);
  };

  const setRegistrationHandler = (e: any) => {
    e.preventDefault();
    setRegistration(false);
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
          <LoginForm
            loginHandler={loginHandler}
            signupHandler={signupHandler}
            passwordState={{
              passwordHandler,
              password,
              forgetPasswordHandler,
            }}
            emailState={{
              email,
              emailHandler,
            }}
          />
        )}
        {forgetPassword && (
          <ResetPassword
            emailState={{
              emailHandler,
              email,
            }}
            sendLinkHandler={sendLinkHandler}
            setForgetPasswordHandler={setForgetPasswordHandler}
          />
        )}
        {resetPasswordToken && (
          <NewPassword
            passwordHandler={passwordHandler}
            password={password}
            resetPasswordHandler={resetPasswordHandler}
          />
        )}
        {registration && (
          <Registration
            emailState={{
              email,
              emailHandler,
            }}
            nameState={{
              name,
              nameHandler,
            }}
            passwordState={{
              password,
              passwordHandler,
            }}
            registerHandler={registerHandler}
            setRegistrationHandler={setRegistrationHandler}
          />
        )}
      </section>
    </AuthPageLayout>
  );
};

export default Login;
