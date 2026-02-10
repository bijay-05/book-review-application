import React, { useState, useEffect, useContext } from "react";
import { sessionVerify, userLogin } from "../requests/authLogin";

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
  const [authStatus, setAuthStatus] = useState(AuthStatus.Loading);

  useEffect(() => {
    async function getSessionInfo() {
      try {
        const sessionStatus = await getSession();
        if (sessionStatus) {
          setAuthStatus(AuthStatus.SignedIn);
        } else {
          setAuthStatus(AuthStatus.SignedOut);
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
      // await cognito.signUpUserWithEmail(username, email, password);
    } catch (err) {
      throw err;
    }
  }

  function signOut() {
    window.localStorage.clear();
    setAuthStatus(AuthStatus.SignedOut);
  }

  async function getSession() {
    try {
      const token = window.localStorage.getItem("accessToken");
      if (!token) {
        return false;
      }
      const tokenStatus = await sessionVerify(token);
      if (tokenStatus) {
        return true;
      } else {
        return false;
      }
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

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
