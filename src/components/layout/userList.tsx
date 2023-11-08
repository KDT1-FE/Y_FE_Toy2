import { useEffect } from 'react';
import { getAllUsers } from '../../api';
import { useRecoilState } from 'recoil';
import { allUserState } from '../../states/atom';

const POLLING_INTERVAL = 30000;

const UserList = () => {
  const [allUsers, setAllUsers] = useRecoilState(allUserState);

  const fetchData = async () => {
    try {
      const token: any = localStorage.getItem('accessToken');
      const allUsersData = await getAllUsers(token);
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
