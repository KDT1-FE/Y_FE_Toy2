import { GlobalStyle } from "./style/GlobalStyle";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import PageNotFound from "./components/PageNotFound";
import { Theme, darkTheme, lightTheme } from "./style/theme";
import Profile from "./components/Profile/Profile";
import { AuthProvider } from "./hooks/useAuth";
import { createContext } from "react";
import { useDarkMode } from "./hooks/useDarkMode";
import ProfilePage from "./pages/Profile/ProfilePage";
import MainContents from "./pages/MainContents";
import ProfileEditPage from "./pages/Profile/ProfileEditPage";
import Chat from "./pages/Chat";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import ChatTest from "./pages/ChatTest";
import ChatTesters from "./pages/ChatTesters";
import ChatRoom from "./pages/ChatRoom";

interface ContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ContextProps>({
  theme: lightTheme,
  toggleTheme: () => {}
});

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
        path: "login",
        element: <Login />
      },
      {
        path: "signup",
        element: <SignUp />
      },
      {
        path: "chattest",
        element: <ChatTest />
      },
      {
        path: "chattst",
        element: <ChatTesters />
      },
      {
        path: "chatrm",
        element: <ChatRoom />
      }
    ]
  },
  {
    path: "chat",
    element: <Chat />
  },
  {
    path: "*",
    element: <PageNotFound />
  }
]);

const App: React.FC = () => {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <>
      <AuthProvider>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <GlobalStyle theme={theme === lightTheme ? lightTheme : darkTheme} />
          <RouterProvider router={router} />
        </ThemeContext.Provider>
      </AuthProvider>
    </>
  );
};

export default App;


