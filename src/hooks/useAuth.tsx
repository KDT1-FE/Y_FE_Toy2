import React, { createContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

const initialState: AuthContextInterface = {
  accessToken: null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  setAccessToken: () => {},
  setRefreshToken: () => {},
  refreshAccessToken: () => {}
};

const AuthContext = createContext<AuthContextInterface>(initialState);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    initialState.accessToken
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    initialState.refreshToken
  );

  useEffect(() => {
    localStorage.setItem("refreshToken", refreshToken || "");
    refreshAccessToken();
    console.log("리프레쉬 토큰이 생성됨", refreshToken);
  }, [refreshToken]);

  const refreshAccessToken = async () => {
    const REFRESH_TOKEN_API_URL = "https://fastcampus-chat.net/refresh";
    try {
      const response = await axios.post(REFRESH_TOKEN_API_URL, {
        refreshToken
      });
      setAccessToken(response.data.accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        refreshAccessToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextInterface {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  refreshAccessToken: () => void;
}
