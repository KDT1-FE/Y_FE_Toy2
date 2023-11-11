import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { myUserDataState, accessTokenState } from '../../states/atom';
import { getUserData } from '../../api';

const MyUserData = () => {
  const [myData, setMyData] = useRecoilState(myUserDataState);
  const accessToken: any = useRecoilValue(accessTokenState);
  const myUserId = localStorage.getItem('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserData(accessToken, myUserId);
        setMyData(userData.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [accessToken, myUserId, setMyData]);

  return (
    <>
      <p>{myData && myData.id}</p>
      <p>{myData && myData.name}</p>
      <p>{myData && myData.picture}</p>
    </>
  );
};

export default MyUserData;
