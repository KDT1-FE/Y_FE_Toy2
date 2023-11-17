import { useRecoilValue } from 'recoil';
import { nowProfiles } from '../states/atom';

const CheckNums = (): boolean => {
  const nowUsers = useRecoilValue(nowProfiles);

  return nowUsers === 4;
};

export default CheckNums;
