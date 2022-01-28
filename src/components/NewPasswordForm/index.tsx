import { SendButton, Title } from '../../styles/ui';
import { AuthCard, AuthInput } from '../../styles/auth';
import { VscArrowRight } from 'react-icons/vsc';

type Props = {
  passwordHandler: (e: any) => void;
  password: string;
  resetPasswordHandler: (e: any) => void;
};

const NewPassword = (props: Props) => {
  return (
    <>
      <Title textAlign="center" fontSize={3.5}>
        Reset Password
      </Title>
      <form>
        <AuthCard>
          <AuthInput
            type="text"
            placeholder="New Password"
            onChange={props.passwordHandler}
            value={props.password}
          />
          <SendButton color="green" onClick={props.resetPasswordHandler}>
            Reset Password <VscArrowRight className="icon" />
          </SendButton>
        </AuthCard>
      </form>
    </>
  );
};

export default NewPassword;
