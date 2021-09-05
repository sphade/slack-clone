import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Chat from "./Chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./components/Login";
import logo from './components/slack.png'
import Spinner from 'react-spinkit'
export default function App() {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
        <img src={logo} alt="" />
        </AppLoadingContents>
        <Spinner fadeIn='none'   name="ball-spin-fade-loader" color='purple' />
        
      </AppLoading>
    );
  }
  return (
    <Router>
      {
        // TODO:change user to !user
      }
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <AppBody>
            <Sidebar />

            <Switch>
              <Route to="/" exact>
                <Chat />
              </Route>
            </Switch>
          </AppBody>
        </>
      )}
    </Router>
  );
}

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
const AppLoadingContents = styled.div`
margin-bottom: 50px;
`;
const AppLoading = styled.div`
text-align: center;
padding-bottom: 100px;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
height: 100vh;

`;

