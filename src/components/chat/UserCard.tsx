import React from 'react';
import * as S from '../../styles/chat/UserCardStyles';
import { UserType } from '../../types/ChatType';

interface IUserCardProps {
  user: UserType;
  selectedUser: UserType;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserType>>;
}

function UserCard({ user, selectedUser, setSelectedUser }: IUserCardProps) {
  const handleSelectedUser = () => {
    if (selectedUser.id === user.id) {
      setSelectedUser({ id: '', name: '', picture: '' });
      return;
    }

    setSelectedUser(user);
  };

  return (
    <S.Wrapper
      onClick={handleSelectedUser}
      select={selectedUser.id === user.id}
    >
      <S.ImgWrapper>
        <S.UserImg src={user.picture} alt="유저 이미지" />
      </S.ImgWrapper>
      <S.UserName>{user.name}</S.UserName>
    </S.Wrapper>
  );
}

export default UserCard;
