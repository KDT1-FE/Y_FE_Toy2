import React from 'react';
import { Box, styled } from '@mui/material';
import { User } from '../../types/ChatType';

interface IUserCardProps {
  user: User;
  selectedUser: User;
  setSelectedUser: React.Dispatch<React.SetStateAction<User>>;
}

interface IStyledWrapperProps {
  select: boolean;
}

const Wrapper = styled('div')(({ select }: IStyledWrapperProps) => ({
  padding: '8px 16px',
  cursor: 'pointer',
  backgroundColor: `${select ? '#eeeeee' : ''}`,

  display: 'flex',
  alignItems: 'center',
  gap: '14px',

  '&:hover': {
    backgroundColor: '#eeeeee',
  },
}));

const ImgWrapper = styled(Box)({});

const UserImg = styled('img')({
  width: '44px',
  height: '44px',
  borderRadius: '50%',
});

const UserName = styled('p')({});

function UserCard({ user, selectedUser, setSelectedUser }: IUserCardProps) {
  const handleSelectedUser = () => {
    if (selectedUser.id === user.id) {
      setSelectedUser({ id: '', name: '', picture: '' });
      return;
    }

    setSelectedUser(user);
  };

  return (
    <Wrapper onClick={handleSelectedUser} select={selectedUser.id === user.id}>
      <ImgWrapper>
        <UserImg src={user.picture} alt="유저 이미지" />
      </ImgWrapper>
      <UserName>{user.name}</UserName>
    </Wrapper>
  );
}

export default UserCard;
