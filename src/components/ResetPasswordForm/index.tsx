import { SendButton, Title } from '../../styles/ui';
import { AuthCard, AuthInput } from '../../styles/auth';
import { VscArrowLeft, VscArrowRight } from 'react-icons/vsc';

type Props = {
  emailState: {
    emailHandler: (e: any) => void;
    email: string;
  };
  sendLinkHandler: (e: any) => void;
  setForgetPasswordHandler: (e: any) => void;
};

const ResetPassword = (props: Props) => {
  return (
    <>
      <Title textAlign="center" fontSize={3.5}>
        Reset Password
      </Title>
      <form>
        <AuthCard>
          <AuthInput
            type="email"
            placeholder="Email"
            onChange={props.emailState.emailHandler}
            value={props.emailState.email}
          />
          <SendButton color="green" onClick={props.sendLinkHandler}>
            Send Link <VscArrowRight className="icon" />
          </SendButton>
        </AuthCard>
      </form>
      <SendButton color="gray" onClick={props.setForgetPasswordHandler}>
        <VscArrowLeft className="icon" />
        Back
      </SendButton>
    </>
  );
};

export default ResetPassword;
