import React, { useState } from "react";
import { AuthCard, AuthInput, AuthPageLayout } from "../styles/auth";
import { Title, SendButton } from "../styles/ui";
import AuthPageTitle from "../components/AuthPageTitle/AuthPageTitle";

import { VscArrowRight } from "react-icons/vsc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (e: any) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e: any) => {
    setPassword(e.target.value);
  };
  const forgetPasswordHandler = (e: any) => {
    e.preventDefault();
    console.log("Em breve!");
  };
  const authHandler = (e: any) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    setEmail("");
    setPassword("");
  };

  return (
    <AuthPageLayout>
      <section>
        <AuthPageTitle />
      </section>
      <section>
        <Title textAlign="center" fontSize={35}>
          Authentication
        </Title>
        <form onSubmit={authHandler}>
          <AuthCard>
            <AuthInput
              type="email"
              placeholder="Email"
              onChange={emailHandler}
              value={email}
            />
            <AuthInput
              type="password"
              placeholder="Password"
              onChange={passwordHandler}
              value={password}
            />
            <button className="forgetPassword" onClick={forgetPasswordHandler}>
              I forget my password
            </button>
            <SendButton>
              Log In <VscArrowRight className="icon" />
            </SendButton>
          </AuthCard>
        </form>
      </section>
    </AuthPageLayout>
  );
};

export default Login;
