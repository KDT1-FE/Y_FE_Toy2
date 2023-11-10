import React, { useState, useEffect, useCallback } from 'react';
import List from '../../styles/home/UserList.styled';
import User from './User';
import { UserData, getData } from '../../utils/utils';

function UserList({ language }: { language: string }) {
  const [userData, setUserData] = useState<UserData[]>([]);

  const fetchData = async () => {
    const data = await getData(language);
    setUserData(data);
  };

  useEffect(() => {
    fetchData();
  }, [language]);

  return (
    <List>
      {userData &&
        userData.map((data: UserData) => {
          const { id } = data;
          return <User key={id} data={data} />;
        })}
    </List>
  );
}

export default UserList;
