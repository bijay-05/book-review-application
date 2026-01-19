import React, { useState, useEffect, useContext } from "react";

import * as cognito from "../libs/cognito";

export const AuthStatus = {
  Loading: "Loading",
  SignedIn: "SignedIn",
  SignedOut: "SignedOut",
};

const defaultState = {
  sessionInfo: {},
  authStatus: AuthStatus.Loading,
};

export const AuthContext = React.createContext(defaultState);

export const AuthIsSignedIn = ({ children }) => {
  const { authStatus } = useContext(AuthContext);

  return <>{authStatus === AuthStatus.SignedIn ? children : null}</>;
};

export const AuthIsNotSignedIn = ({ children }) => {
  const { authStatus } = useContext(AuthContext);
  return <>{authStatus === AuthStatus.SignedOut ? children : null}</>;
};

const AuthProvider = ({ children }) => {
  console.log("Entered into AUth Provider");
  const [authStatus, setAuthStatus] = useState(AuthStatus.Loading);
  const [sessionInfo, setSessionInfo] = useState({});
  const [attrInfo, setAttrInfo] = useState([]);

  useEffect(() => {
    async function getSessionInfo() {
      try {
        const session = await getSession();
        setSessionInfo({
          accessToken: session.accessToken.jwtToken,
          refreshToken: session.refreshToken.token,
        });
        window.localStorage.setItem(
          "accessToken",
          `${session.accessToken.jwtToken}`
        );
        window.localStorage.setItem(
          "refreshToken",
          `${session.refreshToken.token}`
        );
        window.localStorage.setItem("id_token", `${session.idToken.jwtToken}`);
        await setAttribute({ Name: "website", Value: "www.google.com" });
        const attr = await getAttributes();
        setAttrInfo(attr);
        setAuthStatus(AuthStatus.SignedIn);
      } catch (err) {
        setAuthStatus(AuthStatus.SignedOut);
      }
    }
    getSessionInfo();
  }, [setAuthStatus, authStatus]);

  if (authStatus === AuthStatus.Loading) {
    return null;
  }

  async function signInWithEmail(username, password) {
    try {
      await cognito.signInWithEmail(username, password);
      setAuthStatus(AuthStatus.SignedIn);
    } catch (err) {
      setAuthStatus(AuthStatus.SignedOut);
      throw err;
    }
  }

  async function signUpWithEmail(username, email, password) {
    try {
      await cognito.signUpUserWithEmail(username, email, password);
    } catch (err) {
      throw err;
    }
  }

  function signOut() {
    cognito.signOut();
    setAuthStatus(AuthStatus.SignedOut);
  }

  async function verifyCode(username, code) {
    try {
      await cognito.verifyCode(username, code);
    } catch (err) {
      throw err;
    }
  }

  async function getSession() {
    try {
      const session = await cognito.getSession();
      console.log("This is the session: ", session);
      return session;
    } catch (err) {
      throw err;
    }
  }

  async function getAttributes() {
    try {
      const attr = await cognito.getAttributes();
      return attr;
    } catch (err) {
      throw err;
    }
  }

  async function setAttribute(attr) {
    try {
      const res = await cognito.setAttribute(attr);
      return res;
    } catch (err) {
      throw err;
    }
  }

  async function sendCode(username) {
    try {
      await cognito.sendCode(username);
    } catch (err) {
      throw err;
    }
  }

  async function forgotPassword(username, code, password) {
    try {
      await cognito.forgotPassword(username, code, password);
    } catch (err) {
      throw err;
    }
  }

  async function changePassword(oldPassword, newPassword) {
    try {
      await cognito.changePassword(oldPassword, newPassword);
    } catch (err) {
      throw err;
    }
  }

  const state = {
    authStatus,
    sessionInfo,
    attrInfo,
    signUpWithEmail,
    signInWithEmail,
    signOut,
    verifyCode,
    getSession,
    sendCode,
    forgotPassword,
    changePassword,
    getAttributes,
    setAttribute,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
