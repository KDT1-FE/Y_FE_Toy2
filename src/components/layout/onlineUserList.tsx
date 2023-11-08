import { useRecoilValue } from 'recoil';
import { onlineUserState } from '../../states/atom';

const OnlineUserList = () => {
  const socket = useRecoilValue(onlineUserState);
  console.log(socket);

  return <div>OnlineUserList</div>;
};

export default OnlineUserList;
