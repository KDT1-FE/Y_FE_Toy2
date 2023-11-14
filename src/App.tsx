import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import MainRouter from './router/MainRouter';
import { useConnectSocket } from './hooks/useConnectSocket';

function App() {
  useConnectSocket();

  return (
    <ChakraProvider>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
