// import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./style/GlobalStyle";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import PageNotFound from "./components/PageNotFound";
import { darkTheme, lightTheme } from "./style/theme";
import { useEffect, useState } from "react";
import { DarkModeProvider } from "./hooks/useDarkMode";
import Profile from "./components/Profile/Profile";
import MainContents from "./pages/MainContents";
import ProfilePage from "./pages/Profile/ProfilePage";
import ProfileEditPage from "./pages/Profile/ProfileEditPage";
import Chat from "./pages/Chat";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "", element: <MainContents /> },
      {
        path: "profiles",
        element: <Profile />
      },
      {
        path: "profiles/:userid",
        element: <ProfilePage />
      },
      { path: "profiles/:userid/edit", element: <ProfileEditPage /> },
      {
        path: "chat",
        element: <Chat />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "signup",
        element: <SignUp />
      }
    ]
  },
  {
    path: "*",
    element: <PageNotFound />
  }
]);

function App() {
  const [isDarkMode, setisDarkMode] = useState(false);

  useEffect(() => {
    const storedMode = window.localStorage.getItem("isDarkMode");
    if (storedMode) {
      setisDarkMode(storedMode === "true");
    }
  }, []);

  const theme = isDarkMode ? darkTheme : lightTheme;
  return (
    <DarkModeProvider>
      <Wrapper>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <RouterProvider router={router} />
        </ThemeProvider>
      </Wrapper>
    </DarkModeProvider>
  );
}

export default App;

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-rows: auto 1fr auto 2fr;
`;
