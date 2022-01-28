import { useState } from 'react';
import AuthPageTitle from '../../components/AuthPageTitle';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/AccountSlice';
import { AuthPageLayout } from '../../styles/auth';
import {
  LoginForm,
  ResetPassword,
  NewPassword,
  Registration,
  AlertError,
  AlertSuccess,
} from '../../components';
import { userServices, authServices } from '../../services';
import { emailValidator, passwordValidator } from '../../shared/helpers';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [forgetPassword, setForgetPassword] = useState(false);
  const [resetPasswordToken, setResetPasswordToken] = useState('');
  const [registration, setRegistration] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { createUser } = userServices();
  const { loginUser, resetPassword, changePassword } = authServices();

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

  const sendLinkHandler = async (e: any) => {
    e.preventDefault();
    if (emailValidator(email)) {
      await resetPassword(email)
        .then((response) => {
          setResetPasswordToken(response.token);
          setForgetPassword(false);
          setEmail('');
        })
        .catch((error) => AlertError(error.response.data.message));
    } else {
      AlertError('Digite um email válido.');
    }
  };

  const resetPasswordHandler = async (e: any) => {
    e.preventDefault();
    if (passwordValidator(password)) {
      await changePassword(resetPasswordToken, password)
        .then(async (response) => {
          await dispatch(updateUser(response));
          setResetPasswordToken('');
          setPassword('');
          AlertSuccess('Senha alterada com sucesso');
        })
        .catch((error) => {
          AlertError(error.response.data.message);
        });
    } else {
      AlertError(
        'Digite uma senha válida. É necessário pelo menos oito caracteres sendo eles pelo menos um número e uma letra.'
      );
    }
  };

  const loginHandler = async (e: any) => {
    e.preventDefault();
    await loginUser({ email, password })
      .then((response) => {
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
        AlertError(error.response.data.message);
      });
  };

  const registerHandler = (e: any) => {
    e.preventDefault();
    if (emailValidator(email)) {
      if (passwordValidator(password)) {
        createUser({ email, password, name })
          .then((response) => {
            if (response === 200) AlertSuccess('Usuário criado com sucesso');
            setEmail('');
            setPassword('');
            setName('');
            setRegistration(false);
          })
          .catch((error) => {
            AlertError(error.reponse.data.message);
          });
      } else {
        AlertError(
          'Digite uma senha válida. É necessário pelo menos oito dígitos sendo pelo menos um número e uma letra.'
        );
      }
    } else {
      AlertError('Digite um email válido');
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
