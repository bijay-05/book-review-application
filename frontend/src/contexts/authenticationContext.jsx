import React, { useState, useEffect, useContext } from "react";

import * as cognito from "../libs/cognito";
import { userLogin } from "../requests/authLogin";

export const AuthStatus = {
  Loading: "Loading",
  SignedIn: "SignedIn",
  SignedOut: "SignedOut",
};

const defaultState = {
  sessionInfo: {},
  authStatus: AuthStatus.Loading,
};

export const AuthbContext = React.createContext(defaultState);

export const AuthbIsSignedIn = ({ children }) => {
  const { authStatus } = useContext(AuthbContext);

  return <>{authStatus === AuthStatus.SignedIn ? children : null}</>;
};

export const AuthbIsNotSignedIn = ({ children }) => {
  const { authStatus } = useContext(AuthbContext);
  return <>{authStatus === AuthStatus.SignedOut ? children : null}</>;
};

const AuthbProvider = ({ children }) => {
  console.log("Entered into AUth Provider");
  const [authStatus, setAuthStatus] = useState(AuthStatus.Loading);

  useEffect(() => {
    async function getSessionInfo() {
      try {
        const sessionStatus = getSession();
        if (sessionStatus) {
          setAuthStatus(AuthStatus.SignedIn);
        }
      } catch (err) {
        setAuthStatus(AuthStatus.SignedOut);
      }
    }
    getSessionInfo();
  }, [setAuthStatus, authStatus]);

  if (authStatus === AuthStatus.Loading) {
    return null;
  }

  async function signInWithEmail(useremail, password) {
    try {
      await userLogin(useremail, password);
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

  async function getSession() {
    try {
      const token = window.localStorage.getItem("accessToken");
      if (!token) {
        return false;
      }
      return true;
    } catch (err) {
      throw err;
    }
  }

  const state = {
    authStatus,
    signUpWithEmail,
    signInWithEmail,
    signOut,
    getSession,
  };

  return (
    <AuthbContext.Provider value={state}>{children}</AuthbContext.Provider>
  );
};

export default AuthbProvider;
