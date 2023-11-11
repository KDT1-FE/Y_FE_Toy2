import { Box } from '@chakra-ui/react';
import { useUsers } from '../../../hooks/useUsers';
import { useEffect } from 'react';

interface Props {
  setUsers: React.Dispatch<React.SetStateAction<string[]>>;
}

const UserList = ({ setUsers }: Props) => {
  const { data: users, isLoading, addUser, userList } = useUsers();

  useEffect(() => {
    setUsers(userList);
  }, [userList]);

  return (
    <Box>
      {isLoading ? (
        <div>로딩중...</div>
      ) : (
        users?.map((user) => (
          <div key={user.id} onClick={() => addUser(user.id)}>
            {user.name}
          </div>
        ))
      )}
    </Box>
  );
};

export default UserList;
