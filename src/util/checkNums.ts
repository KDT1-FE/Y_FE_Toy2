import { useRecoilValue } from 'recoil';
import { onlineUserStateInGameRoom } from '../states/atom';

const CheckNums = (): boolean => {
  const nowUsers = useRecoilValue(onlineUserStateInGameRoom);
  console.log(nowUsers);
  const len = nowUsers.length;

  return len === 4;
};

export default CheckNums;
