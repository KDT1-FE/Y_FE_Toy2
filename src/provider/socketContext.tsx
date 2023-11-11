import { createContext, useContext, useState } from 'react';
import { loginSocket } from '../api/socket';

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const createSocket = (accessToken: any) => {
    const newSocket = loginSocket(accessToken);
    setSocket(newSocket);
    return newSocket;
  };

  return (
    <SocketContext.Provider value={{ socket, createSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
