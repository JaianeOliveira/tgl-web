import { SendButton, Title } from '../../styles/ui';
import { AuthCard, AuthInput } from '../../styles/auth';
import { VscArrowLeft, VscArrowRight } from 'react-icons/vsc';

type Props = {
  emailState: {
    emailHandler: (e: any) => void;
    email: string;
  };
  nameState: {
    nameHandler: (e: any) => void;
    name: string;
  };
  passwordState: {
    passwordHandler: (e: any) => void;
    password: string;
  };
  registerHandler: (e: any) => void;
  setRegistrationHandler: (e: any) => void;
};

const Registration = (props: Props) => {
  return (
    <>
      <Title textAlign="center" fontSize={3.5}>
        Registration
      </Title>
      <form>
        <AuthCard>
          <AuthInput
            type="text"
            placeholder="Name"
            onChange={props.nameState.nameHandler}
            value={props.nameState.name}
          />
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
          <SendButton color="green" onClick={props.registerHandler}>
            Register <VscArrowRight className="icon" />
          </SendButton>
        </AuthCard>
      </form>
      <SendButton color="gray" onClick={props.setRegistrationHandler}>
        <VscArrowLeft className="icon" /> Back
      </SendButton>
    </>
  );
};

export default Registration;
