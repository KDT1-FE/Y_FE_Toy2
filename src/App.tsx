import React from 'react';
import { Flex } from '@chakra-ui/react';
import SideBar from './components/SideBar/SideBar';

function App() {
  return (
    <div className="App">
      <Flex>
        <SideBar />
      </Flex>
    </div>
  );
}

export default App;
