import { useRecoilValue } from 'recoil';
import { usersInRoom } from '../states/atom';

const CheckNums = (): boolean => {
  const nowUsers = useRecoilValue(usersInRoom);

  return nowUsers === 2;
};

export default CheckNums;
