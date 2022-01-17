import React, { useEffect, useState } from "react";
import { AuthCard, AuthInput, AuthPageLayout } from "../styles/auth";
import { Title, SendButton } from "../styles/ui";
import AuthPageTitle from "../components/AuthPageTitle/AuthPageTitle";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { getGameData, loginFetch, newUser } from "../services/api";
import { VscArrowRight, VscArrowLeft } from "react-icons/vsc";
import { postRequests } from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   getGameData().then((response) => dispatch(getData(response)));
  // }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [forgetPassword, setForgetPassword] = useState(false);
  const [registration, setRegistration] = useState(false);

  const emailHandler = (e: any) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e: any) => {
    setPassword(e.target.value);
  };
  const nameHandler = (e: any) => {
    setName(e.target.value);
  };
  const forgetPasswordHandler = (e: any) => {
    e.preventDefault();
    setForgetPassword(true);
  };
  const signupHandler = (e: any) => {
    e.preventDefault();
    setRegistration(true);
  };
  const sendLinkHandler = (e: any) => {
    e.preventDefault();
    postRequests("/reset", { email: email });
    setEmail("");
  };

  const loginHandler = (e: any) => {
    e.preventDefault();
    loginFetch({ email, password })
      .then((response) => {
        console.log(response);
        dispatch(
          login({
            email: response.user.email,
            user: response.user.name,
            token: response.token.token,
          })
        );
      })
      .then(() => {
        navigate("/home");
        setPassword("");
        setEmail("");
      });
  };
  const registerHandler = (e: any) => {
    e.preventDefault();
    newUser({ email, password, name })
      .then((response) => {
        if (response.ok) {
          loginFetch({ email, password }).then(() => {
            dispatch(
              login({
                email: response.user.email,
                user: response.user.name,
                token: response.token.token,
              })
            );
          });
        }
      })
      .then(() => navigate("/home"));
  };

  return (
    <AuthPageLayout>
      <section>
        <AuthPageTitle />
      </section>
      <section>
        {!forgetPassword && !registration && (
          <>
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
            <SendButton color="gray" onClick={signupHandler}>
              Sign Up <VscArrowRight className="icon" />
            </SendButton>
          </>
        )}
        {forgetPassword && (
          <>
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
          </>
        )}
        {registration && (
          <>
            <Title textAlign="center" fontSize={35}>
              Registration
            </Title>
            <form>
              <AuthCard>
                <AuthInput
                  type="text"
                  placeholder="Name"
                  onChange={nameHandler}
                  value={name}
                />
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
                <SendButton color="green" onClick={registerHandler}>
                  Register <VscArrowRight className="icon" />
                </SendButton>
              </AuthCard>
            </form>
            <SendButton color="gray" onClick={() => setRegistration(false)}>
              <VscArrowLeft className="icon" /> Back
            </SendButton>
          </>
        )}
      </section>
    </AuthPageLayout>
  );
};

export default Login;
