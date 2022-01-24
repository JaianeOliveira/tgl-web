import HeaderBar from '../Header/Header';
import FooterBar from '../Footer/Footer';
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
