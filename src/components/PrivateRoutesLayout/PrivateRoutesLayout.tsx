import React from "react";
import HeaderBar from "../Header/Header";
import { Body } from "../../styles/ui";
import FooterBar from "../Footer/Footer";
const PrivateRoutesLayout = (props: any) => {
  return (
    <React.Fragment>
      <HeaderBar />
      <Body>{props.children}</Body>
      <FooterBar />
    </React.Fragment>
  );
};

export default PrivateRoutesLayout;
