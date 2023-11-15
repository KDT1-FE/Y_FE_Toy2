import React from 'react';
import { useNavigate } from 'react-router-dom';
import OpenchatFriendItem from './OpenchatFriendItem';
import { UserInfoWithId } from '../../../types/User';
import useMutationCreateChat from '../../../hooks/useMutationCreateChat';
import { privateApi } from '../../../libs/axios';

interface OpenchatFriendsProps {
  friends: UserInfoWithId[];
}

function OpenchatFriends({ friends }: OpenchatFriendsProps) {
  const navigate = useNavigate();
  const { createDmChatOrJoin, creatingId } = useMutationCreateChat();
  const onClickDm = async (chatName: string, userId: string, myId: string) => {
    await createDmChatOrJoin(chatName, userId, myId);
  };
  return (
    <div>
      {friends.map((friend) => (
        <OpenchatFriendItem
          key={friend.id}
          friend={friend}
          onClickDm={onClickDm}
          creatingId={creatingId}
        />
      ))}
    </div>
  );
}

export default React.memo(OpenchatFriends);
