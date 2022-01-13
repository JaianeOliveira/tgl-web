import React, { useState } from "react";
import { AuthCard, AuthInput, AuthPageLayout } from "../styles/auth";
import { Title, SendButton } from "../styles/ui";
import AuthPageTitle from "../components/AuthPageTitle/AuthPageTitle";

import { VscArrowRight, VscArrowLeft } from "react-icons/vsc";

import { postRequests } from "../services/api";

import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // esse é um estado que precisa ser gerenciado pelo redux
  const [userdata, setuserData] = useState([]);
  const [forgetPassword, setForgetPassword] = useState(false);

  const emailHandler = (e: any) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e: any) => {
    setPassword(e.target.value);
  };
  const forgetPasswordHandler = (e: any) => {
    e.preventDefault();
    setForgetPassword(true);
  };
  const sendLinkHandler = (e: any) => {
    e.preventDefault();
    postRequests("/reset", { email: email });
    setEmail("");
  };
  const loginHandler = (e: any) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    postRequests("/login", { email: email, password: password }, setuserData);
    setEmail("");
    setPassword("");
  };

  return (
    <AuthPageLayout>
      <section>
        <AuthPageTitle />
      </section>
      <section>
        {!forgetPassword && (
          <React.Fragment>
            <Title textAlign="center" fontSize={35}>
              Authentication
            </Title>
            <form onSubmit={loginHandler}>
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
                <button
                  type="button"
                  className="forgetPassword"
                  onClick={forgetPasswordHandler}
                >
                  I forget my password
                </button>
                <SendButton type="submit" color="green">
                  Log In <VscArrowRight className="icon" />
                </SendButton>
              </AuthCard>
            </form>
            <SendButton color="gray">
              Sign Up <VscArrowRight className="icon" />
            </SendButton>
          </React.Fragment>
        )}
        {forgetPassword && (
          <React.Fragment>
            <Title textAlign="center" fontSize={35}>
              Reset Password
            </Title>
            <form>
              <AuthCard>
                <AuthInput
                  type="email"
                  placeholder="Email"
                  onChange={emailHandler}
                  value={email}
                />
                <SendButton color="green" onClick={sendLinkHandler}>
                  Send Link <VscArrowRight className="icon" />
                </SendButton>
              </AuthCard>
            </form>
            <SendButton color="gray" onClick={() => setForgetPassword(false)}>
              <VscArrowLeft className="icon" />
              Back
            </SendButton>
          </React.Fragment>
        )}
      </section>
    </AuthPageLayout>
  );
};

export default Login;
