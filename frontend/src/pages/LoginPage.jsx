import React, { useState, useContext } from "react";
import { useValidPassword, useValidEmail } from "../hooks/useAuthHooks";
import { AuthContext } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { AuthbContext } from "../contexts/authenticationContext";

export default function LogIn() {
  const { email, setEmail, emailIsValid } = useValidEmail("");
  const { password, setPassword, passwordIsValid } = useValidPassword("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isValid =
    !emailIsValid ||
    email.length === 0 ||
    !passwordIsValid ||
    password.length === 0;

  // const authContext = useContext(AuthContext);
  const authContext = useContext(AuthbContext);

  const signInClicked = async () => {
    try {
      await authContext.signInWithEmail(email, password);
      navigate("/");
    } catch (err) {
      if (err.code === "UserNotConfirmedException") {
        console.log("Error: in  UserNotConfirmedException");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <>
      <div className="w-fit mx-auto">
        <div className="p-8 m-8 rounded-md shadow-md  bg-green-200">
          <form onSubmit={signInClicked}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-bold mb-2">
                Email:
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-bold mb-2"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="flex justify-center gap-4 w-[20]">
              <button
                onClick={() => navigate("/")}
                className="border-2 px-4 py-2 rounded-md bg-red-600 text-white text-xl"
              >
                Cancel
              </button>
              <button
                disabled={isValid}
                className="border-2 px-4 py-2 rounded-md bg-blue-600 text-white text-xl hover:bg-green-600"
              >
                LogIn
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
