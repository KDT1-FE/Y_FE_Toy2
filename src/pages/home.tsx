import React, { useState } from 'react';
import HomeContainer from '../styles/home/Home.styled';
import LanguageFilter from '../components/home/LanguageFilter';
import UserList from '../components/home/UserList';

function Home() {
  const [language, setLanguage] = useState('English');

  const handleFilterChange = (value: string) => {
    setLanguage(value);
  };

  return (
    <HomeContainer>
      <LanguageFilter onChangeFilter={handleFilterChange} />
      <UserList language={language} />
    </HomeContainer>
  );
}

export default Home;
