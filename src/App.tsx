import React from 'react';
import { ChakraProvider, Flex } from '@chakra-ui/react';

import SideBar from './components/SideBar/SideBar';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Flex>
          <SideBar />
        </Flex>
      </div>
    </ChakraProvider>
  );
}

export default App;
