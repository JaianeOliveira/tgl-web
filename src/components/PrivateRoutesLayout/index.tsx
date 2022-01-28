import HeaderBar from '../Header';
import FooterBar from '../Footer';
import { Body } from '../../styles/ui';

const PrivateRoutesLayout = (props: any) => {
  return (
    <>
      <HeaderBar />
      <Body>{props.children}</Body>
      <FooterBar />
    </>
  );
};

export default PrivateRoutesLayout;
