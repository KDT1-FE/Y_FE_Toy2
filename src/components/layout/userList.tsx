import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { allUserState } from '../../states/atom';
import { getAllUsers } from '../../api';

const UserList = () => {
  const [allUsers, setAllUsers] = useRecoilState(allUserState);
  // const [allRooms, setAllRooms] = useRecoilState(allRoomState);
  const token: any = localStorage.getItem('jwt');
  // const allUsers = useRecoilValue(allUserState);
  console.log(allUsers);
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

  return (
    <>
      {allUsers.map((element, index) => (
        <div key={index}>{element.name}</div>
      ))}
    </>
  );
};

export default UserList;
