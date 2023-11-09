import { useEffect } from 'react';
import { getAllUsers } from '../../api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { accessTokenState, allUserState } from '../../states/atom';

const POLLING_INTERVAL = 30000;

const UserList = () => {
  const [allUsers, setAllUsers] = useRecoilState(allUserState);
  const accessToken: any = useRecoilValue(accessTokenState);
  const fetchData = async () => {
    try {
      const allUsersData = await getAllUsers(accessToken);
      if (JSON.stringify(allUsersData.data) !== JSON.stringify(allUsers)) {
        setAllUsers(allUsersData.data);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  useEffect(() => {
    fetchData();

    const pollingId = setInterval(() => {
      fetchData();
    }, POLLING_INTERVAL);

    return () => {
      clearInterval(pollingId);
    };
  }, [setAllUsers, fetchData]);

  return (
    <>
      <div>AllUserList</div>
      {allUsers.map((element, index) => (
        <div key={index}>{element.name}</div>
      ))}
    </>
  );
};

export default UserList;
