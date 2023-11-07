import { useRecoilValue } from 'recoil';
import { allUserState } from '../../states/atom';

const UserList = () => {
  const allUsers = useRecoilValue(allUserState);
  console.log(allUsers);
  return (
    <>
      {allUsers.map((element, index) => (
        <div key={index}>{element.id}</div>
      ))}
    </>
  );
};

export default UserList;
