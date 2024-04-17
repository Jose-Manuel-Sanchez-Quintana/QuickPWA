/*Importes*/
import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LogInForm } from "./features/login_form/LoginForm";
import { SignUpForm } from "./features/signup_form/SignUpForm";
import { Home } from "./features/home/Home";
import { Chat } from "./features/chat/chat";
import { ProfilePage } from "./features/profilepage/profilepage";
import { Settings } from "./features/settings/settings";
import { NavBar } from "./features/nav_bar/Navbar";
import { AdminTools } from "./features/admin_tools/AdminTools";
// import { NavBar } from './features/nav_bar/Navbar';
// import { Suggestions } from './features/suggestions/Suggestions';
// import { Feed } from './features/feed/Feed';
// import { Profile } from './features/profile/Profile';
// import { Quick_Thought } from './features/quick_thought/Quick_thought';
import { PrivateRoute } from "./features/private_route/PrivateRoute";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import GetQuicker from "./features/get_quicker/GetQuicker";
import axios from "axios";
import SubscriptionsSuccess from "./features/subscriptions_success/SubscriptionsSuccess";
import { Modal } from "./features/modal/Modal";

export const UserContext = React.createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const element = document.documentElement;

  function onReload() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }

  onReload();

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        localStorage.removeItem("theme");
        onReload();
        break;
    }
  }, [theme]);

  darkQuery.addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  });

  const options = [
    {
      icon: "sunny",
      text: "light",
    },
    {
      icon: "moon",
      text: "dark",
    },
    {
      icon: "desktop-outline",
      text: "system",
    },
  ];

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user === null) {
        setUser(false);
      } else {
        axios
          .get(`https://quick-api-9c95.onrender.com/user/` + user.uid, {}, {})
          .then((response) => {
            setUser({
              uid: user.uid,
              ...response.data,
            });
            console.log(response.data);
          });
      }
    });
  }, []);

  return (
    <>
      {/*Navegacion por las rutas de la pagina*/}
      {user != null && (
        <BrowserRouter>
          <UserContext.Provider value={{ user: user, setUser: setUser }}>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute isAllowed={user} redirectTo="/login">
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dms"
                element={
                  <PrivateRoute isAllowed={user} redirectTo="/login">
                    <Chat />
                  </PrivateRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <PrivateRoute isAllowed={user} redirectTo="/login">
                    <Settings />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admintools"
                element={
                  <PrivateRoute
                    isAllowed={
                      user &&
                      user.role !== undefined &&
                      user.role !== undefined &&
                      user.role.indexOf("administrator") !== -1
                    }
                    redirectTo="/login"
                  >
                    <AdminTools />
                  </PrivateRoute>
                }
              />
              <Route
                path="/login"
                element={
                  // Change user to !user to make the route private
                  <PrivateRoute isAllowed={!user} redirectTo="/">
                    <LogInForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  // Change user to !user to make the route private
                  <PrivateRoute isAllowed={!user} redirectTo="/">
                    <SignUpForm />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/profile"
                element={
                  // Change user to !user to make the route private
                  <PrivateRoute isAllowed={user} redirectTo="/">
                    <ProfilePage />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/subscriptions/success"
                element={
                  // Change user to !user to make the route private
                  <PrivateRoute isAllowed={user} redirectTo="/">
                    <SubscriptionsSuccess />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/subscriptions/quicker"
                element={
                  // Change user to !user to make the route private
                  <PrivateRoute isAllowed={user} redirectTo="/">
                    <GetQuicker />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/modal"
                element={
                  // Change user to !user to make the route private
                  <PrivateRoute isAllowed={user} redirectTo="/modal">
                    <Modal />
                  </PrivateRoute>
                }
              />
            </Routes>
          </UserContext.Provider>
        </BrowserRouter>
      )}

      {/*Usuario Prueba*/}
      {/* <p>Test account: a@gmail.com | a123456</p> */}
    </>
  );
}

export default App;
