import { SendButton, Title } from '../../styles/ui';
import { AuthCard, AuthInput } from '../../styles/auth';
import { VscArrowRight } from 'react-icons/vsc';

type Props = {
  loginHandler: (e: any) => void;
  emailState: {
    emailHandler: (e: any) => void;
    email: string;
  };
  passwordState: {
    passwordHandler: (e: any) => void;
    password: string;
    forgetPasswordHandler: (e: any) => void;
  };
  signupHandler: (e: any) => void;
};

const LoginForm = (props: Props) => {
  return (
    <>
      <Title textAlign="center" fontSize={3.5}>
        Authentication
      </Title>
      <form onSubmit={props.loginHandler}>
        <AuthCard>
          <AuthInput
            type="email"
            placeholder="Email"
            onChange={props.emailState.emailHandler}
            value={props.emailState.email}
          />
          <AuthInput
            type="password"
            placeholder="Password"
            onChange={props.passwordState.passwordHandler}
            value={props.passwordState.password}
          />
          <button
            type="button"
            className="forgetPassword"
            onClick={props.passwordState.forgetPasswordHandler}
          >
            I forget my password
          </button>
          <SendButton type="submit" color="green">
            Log In <VscArrowRight className="icon" />
          </SendButton>
        </AuthCard>
      </form>
      <SendButton color="gray" onClick={props.signupHandler}>
        Sign Up <VscArrowRight className="icon" />
      </SendButton>
    </>
  );
};

export default LoginForm;
