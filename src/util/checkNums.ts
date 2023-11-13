import { useRecoilValue } from 'recoil';
import { onlineUserStateInGameRoom } from '../states/atom';

const CheckNums = (): boolean => {
  const nowUsers = useRecoilValue(onlineUserStateInGameRoom);
  const len = nowUsers.length;

  return len === 3;
};

export default CheckNums;
