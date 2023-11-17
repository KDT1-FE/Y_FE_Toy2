import { getAllUsers } from '../../api';
import { useRecoilState } from 'recoil';
import { allUserState } from '../../states/atom';
import usePollingData from './usePollingData';

const userList = () => {
  const [allUsers, setAllUsers] = useRecoilState(allUserState);

  const fetchData = async () => {
    try {
      const allUsersData = await getAllUsers();
      if (JSON.stringify(allUsersData.data) !== JSON.stringify(allUsers)) {
        setAllUsers(allUsersData.data);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  usePollingData(fetchData, [allUsers, setAllUsers]);
};

export default userList;
