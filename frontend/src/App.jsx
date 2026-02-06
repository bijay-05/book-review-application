import "./index.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
const LazyDetailsPage = React.lazy(() => import("./pages/DetailsPage"));
const LazyPageNotFound = React.lazy(() => import("./components/PageNotFound"));
const LazyProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const LazyUserBookReviewPage = React.lazy(
  () => import("./pages/UserBookReviewPage"),
);
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthbProvider, {
  AuthbIsNotSignedIn,
  AuthbIsSignedIn,
} from "./contexts/authenticationContext";
import AddBookCard from "./components/AddBook";
import BookAddPopup from "./components/BookAddDialog";

export default function App() {
  const [showBookAddDialog, setShowBookAddDialog] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AuthbProvider>
                  <AuthbIsSignedIn>
                    <AddBookCard setShowPopup={setShowBookAddDialog} />
                    <BookAddPopup
                      showPopup={showBookAddDialog}
                      setShowPopup={setShowBookAddDialog}
                      addTodo={() => null}
                    />
                  </AuthbIsSignedIn>
                </AuthbProvider>
                <HomePage />
              </>
            }
          />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route
            path="/details/:bookId"
            element={
              <AuthbProvider>
                <AuthbIsNotSignedIn>
                  <React.Suspense fallback={""}>
                    <LazyDetailsPage />
                  </React.Suspense>
                </AuthbIsNotSignedIn>
              </AuthbProvider>
            }
          />
          <Route
            path="/login"
            element={
              <AuthbProvider>
                <AuthbIsNotSignedIn>
                  <LogIn />
                </AuthbIsNotSignedIn>
              </AuthbProvider>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/profile"
            element={
              <React.Suspense fallback={""}>
                <LazyProfilePage />
              </React.Suspense>
            }
          />
          <Route
            path="/profile/reviews"
            element={
              <React.Suspense fallback={""}>
                <LazyUserBookReviewPage />
              </React.Suspense>
            }
          />
          <Route
            path="/*"
            element={
              <React.Suspense fallback={""}>
                <LazyPageNotFound />
              </React.Suspense>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
