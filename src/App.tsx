import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import MainRouter from './router/MainRouter';
import { RecoilRoot } from 'recoil';
import { SocketProvider } from './provider/socketContext';

function App() {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <SocketProvider>
          <BrowserRouter>
            <MainRouter />
          </BrowserRouter>
        </SocketProvider>
      </RecoilRoot>
    </ChakraProvider>
  );
}

export default App;
