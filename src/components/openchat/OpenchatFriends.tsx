import React from 'react';
import OpenchatFriendItem from './OpenchatFriendItem';
import { UserInfoWithId } from '../../types/User';

interface OpenchatFriendsProps {
  friends: UserInfoWithId[];
}

function OpenchatFriends({ friends }: OpenchatFriendsProps) {
  return (
    <div>
      {friends.map((friend) => (
        <OpenchatFriendItem key={friend.id} friend={friend} />
      ))}
    </div>
  );
}

export default React.memo(OpenchatFriends);
