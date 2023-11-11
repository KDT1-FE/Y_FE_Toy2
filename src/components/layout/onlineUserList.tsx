import { useRecoilValue } from 'recoil';
import { allUserState, onlineUserState } from '../../states/atom';

const OnlineUserList = () => {
  const onLine = useRecoilValue(onlineUserState);
  const all = useRecoilValue(allUserState);
  const allOnlineUsers = onLine.users || [];

  const onlineUserListData = all.filter((element) => {
    return allOnlineUsers.includes(element.id);
  });

  return (
    <>
      {onlineUserListData.map((element, key) => (
        <div key={key}>
          <div>OnlineUserList</div>
          <p>{element.id}</p>
          <p>{element.name}</p>
          <p>{element.picture}</p>
        </div>
      ))}
    </>
  );
};

export default OnlineUserList;
