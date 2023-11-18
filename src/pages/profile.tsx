import React, { useState, useEffect } from 'react';
import ProfilePage from '../styles/profile/ProfilePage.styled';
import UserProfile from '../components/profile/UserProfile';
import EditProfile from '../components/profile/EditProfile';
import { privateApi } from '../libs/axios';
import { UserData, getUserData } from '../utils/utils';

function Profile() {
  const [userData, setUserData] = useState<UserData>({});
  const [flag, setFlag] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState('');

  const fetchData = async () => {
    const res = await privateApi('auth/me');
    const { user } = res.data;
    const fetchedUserData = await getUserData(user.id);
    if (fetchedUserData) {
      setUserId(user.id);
      setUserData(fetchedUserData);

      switch (fetchedUserData!.language) {
        case 'English':
          setFlag('/flag/eng.png');
          break;
        case 'Japanese':
          setFlag('/flag/jpn.png');
          break;
        case 'Chinese':
          setFlag('/flag/cn.png');
          break;
        case 'Spanish':
          setFlag('/flag/es.png');
          break;
        case 'French':
          setFlag('/flag/fr.png');
          break;
        case 'German':
          setFlag('/flag/de.png');
          break;
        case 'Vietnamese':
          setFlag('/flag/vn.png');
          break;
        case 'Thai':
          setFlag('/flag/tp.png');
          break;
      }
    }
  };

  const handleEditButton = () => {
    setIsEditing((prevState) => !prevState);
  };

  useEffect(() => {
    fetchData();
  }, [isEditing]);

  return (
    <ProfilePage>
      {isEditing ? (
        <EditProfile
          userId={userId}
          userData={userData}
          onChangeState={handleEditButton}
        />
      ) : (
        <UserProfile
          userData={userData}
          flag={flag}
          onChangeState={handleEditButton}
        />
      )}
    </ProfilePage>
  );
}

export default Profile;
