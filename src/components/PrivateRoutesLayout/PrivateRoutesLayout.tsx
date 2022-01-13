import React from "react";
import HeaderBar from "../Header/Header";

const PrivateRoutesLayout = (props: any) => {
  return (
    <React.Fragment>
      <HeaderBar />
      {props.children}
    </React.Fragment>
  );
};

export default PrivateRoutesLayout;
