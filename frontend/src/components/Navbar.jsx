import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faHouse,
  faStore,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import AuthProvider, { AuthIsSignedIn } from "../contexts/authContext";

export default function Navbar() {
  const [userProfileFlag, setUserProfileFlag] = useState(false);
  const cartProducts = [];

  const changeUserProfileFlag = () => {
    setUserProfileFlag(!userProfileFlag);
  };

  return (
    <div className="px-2 py-2 bg-blue-100 sticky top-0 z-10">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="px-2 py-1 w-fit rounded-lg bg-blue-300 cursor-pointer border-2 border-blue-200">
          <Link to="/">
            <img
              className="w-[80px] h-[80px]"
              src="/static/blogo.png"
              alt="Logo"
            />
          </Link>
        </div>
        {/*  */}
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <div className="w-full md:w-fit text-center bg-blue-200 rounded-md">
            <Link
              to="/"
              className="font-bold block md:inline-block py-1 px-4 hover:bg-orange-300 hover:text-white hover:rounded-lg"
            >
              <FontAwesomeIcon icon={faHouse} />1
              <span className="px-2">Home</span>
            </Link>
          </div>
          <div className="w-full md:w-fit text-center bg-blue-200 rounded-md">
            <Link
              to="/search?s=&category=all"
              className="font-bold block md:inline-block py-1 px-4 hover:bg-orange-300  hover:text-white hover:rounded-lg"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <span className="px-2">Search</span>
            </Link>
          </div>
          <div className="w-full md:w-fit text-center bg-blue-200 rounded-md">
            <Link
              to="/login"
              className="font-bold block md:inline-block py-1 px-4 hover:bg-orange-300 hover:text-white hover:rounded-lg"
            >
              <FontAwesomeIcon icon={faStore} />
              <span className="px-2">Login</span>
            </Link>
          </div>
          <div className="w-full md:w-fit text-center bg-blue-200 rounded-md">
            <Link
              to="/signup"
              className="font-bold block md:inline-block py-1 px-4 hover:bg-orange-300 hover:text-white hover:rounded-lg"
            >
              <FontAwesomeIcon icon={faStore} />
              <span className="px-2">Sign Up</span>
            </Link>
          </div>
        </div>
        {/*  */}
        <div>
          <AuthProvider>
            <AuthIsSignedIn>
              <div className="flex items-center">
                <div
                  className="relative px-4 py-2 border-2 border-blue-200 bg-blue-200 cursor-pointer rounded-lg ml-auto"
                  onClick={changeUserProfileFlag}
                >
                  <FontAwesomeIcon icon={faUser} />
                  <span className="px-2">Hello, John</span>
                  {userProfileFlag && (
                    <div className="py-2 absolute top-full -right-px w-[150px] shadow-lg bg-white rounded-lg">
                      <Link to="/profile">
                        <span className="block w-full px-4 py-1 hover:bg-green-600 hover:border-green-300 hover:text-white">
                          Profile
                        </span>
                      </Link>
                      <span className="block w-full px-4 py-1 hover:bg-green-600 hover:text-white">
                        Settings
                      </span>
                      <span className="block w-full px-4 py-1 hover:bg-white hover:text-red-500 font-semibold">
                        Log Out
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </AuthIsSignedIn>
          </AuthProvider>
        </div>
      </div>
    </div>
  );
}
