import React from "react";
import { Title } from "../../styles/ui";

const AuthPageTitle = () => {
  return (
    <React.Fragment>
      <Title textAlign="center" fontSize={65}>
        The <br />
        Greatest <br />
        App
      </Title>
      <div className="for">for</div>
      <Title textAlign="center" fontSize={83}>
        LOTTERY
      </Title>
    </React.Fragment>
  );
};

export default AuthPageTitle;
