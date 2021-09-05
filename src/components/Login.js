import { Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import slack from "./slack.png";
function Login() {
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };
  return (
    <LoginContainer>
      <img src={slack} alt="" />
      <h1>sign in to the slack clone</h1>
      <Button onClick={signIn}>sign in with google</Button>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;

  > img {
    height: 100px;
    box-shadow: 0px 2px 6px 1px grey;
  }
  object-fit: contain;
  margin-bottom: 40px;
  > button {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: #0a8d48;
    color: white;
    :hover {
      color: #0a8d48;
    }
  }
`;
