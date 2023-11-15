import React from 'react';
import OpenchatFriendItem from './OpenchatFriendItem';
import { UserInfoWithId } from '../../../types/User';
import useMutationCreateChat from '../../../hooks/useMutationCreateChat';

interface OpenchatFriendsProps {
  friends: UserInfoWithId[];
}

function OpenchatFriends({ friends }: OpenchatFriendsProps) {
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
