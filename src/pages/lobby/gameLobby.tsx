import { useEffect } from 'react';
import { getAllUsers } from '../../api/index';
import { useRecoilState } from 'recoil';
import { allUserState } from '../../states/atom';
import UserList from '../../components/layout/userList';

const GameLobby = () => {
  const [allUsers, setAllUsers] = useRecoilState(allUserState);
  const token: any = localStorage.getItem('jwt');

  useEffect(() => {
    async function fetchData() {
      try {
        const allUsersData = await getAllUsers(token);
        setAllUsers(allUsersData);
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
      }
    }

    fetchData();
  }, []);
  return <UserList />;
};

export default GameLobby;
