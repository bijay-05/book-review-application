import "./index.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
const LazyDetailsPage = React.lazy(() => import("./pages/DetailsPage"));
const LazyStorePage = React.lazy(() => import("./pages/StorePage"));
const LazySearchPage = React.lazy(() => import("./pages/SearchPage"));
const LazyPageNotFound = React.lazy(() => import("./components/PageNotFound"));
const LazyProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const LazyUserBookReviewPage = React.lazy(
  () => import("./pages/UserBookReviewPage"),
);
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthProvider, {
  AuthIsNotSignedIn,
  AuthIsSignedIn,
} from "./contexts/authContext";
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
                <AuthProvider>
                  <AuthIsNotSignedIn>
                    <AddBookCard setShowPopup={setShowBookAddDialog} />
                    <BookAddPopup
                      showPopup={showBookAddDialog}
                      setShowPopup={setShowBookAddDialog}
                      addTodo={() => null}
                    />
                  </AuthIsNotSignedIn>
                </AuthProvider>
                <HomePage />
              </>
            }
          />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route
            path="/details/:productId"
            element={
              <AuthProvider>
                <AuthIsSignedIn>
                  <React.Suspense fallback={""}>
                    <LazyDetailsPage />
                  </React.Suspense>
                </AuthIsSignedIn>
              </AuthProvider>
            }
          />
          <Route
            path="/search"
            element={
              <React.Suspense fallback={""}>
                <LazySearchPage />
              </React.Suspense>
            }
          />
          <Route
            path="/mystore"
            element={
              <React.Suspense fallback={""}>
                <LazyStorePage />
              </React.Suspense>
            }
          />
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
