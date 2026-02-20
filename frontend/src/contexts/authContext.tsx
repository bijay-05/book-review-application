import React, { useState, useEffect, useContext } from "react";
import { sessionVerify, userLogin } from "../requests/authLogin.js";
import { userSignUp } from "../requests/addUser.js";

export const AuthStatus = {
  Loading: "Loading",
  SignedIn: "SignedIn",
  SignedOut: "SignedOut",
};

interface IAuthContextValues {
  authStatus: string;
  signUpWithEmail: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  signInWithEmail: (useremail: string, password: string) => Promise<void>;
  signOut: () => void;
  getSession: () => Promise<boolean>;
}

export const AuthContext = React.createContext<IAuthContextValues | null>(null);

export const AuthIsSignedIn = ({ children }: { children: React.ReactNode }) => {
  const authContext = useContext(AuthContext);
  return (
    <>{authContext?.authStatus === AuthStatus.SignedIn ? children : null}</>
  );
};

export const AuthIsNotSignedIn = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const authContext = useContext(AuthContext);
  return (
    <>{authContext?.authStatus === AuthStatus.SignedOut ? children : null}</>
  );
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
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

  async function signInWithEmail(useremail: string, password: string) {
    try {
      await userLogin({ email: useremail, password });
      setAuthStatus(AuthStatus.SignedIn);
    } catch (err) {
      setAuthStatus(AuthStatus.SignedOut);
      throw err;
    }
  }

  async function signUpWithEmail(
    email: string,
    name: string,
    password: string,
  ) {
    try {
      const status = await userSignUp({ email, name, password });

      if (status) {
        alert("Sign Up successful. Please Login now.");
      }
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
