import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import MainRouter from './router/MainRouter';
// import { useLoginSocket } from './hooks/useLoginSocket';

function App() {
  // useLoginSocket();

  return (
    <ChakraProvider>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
