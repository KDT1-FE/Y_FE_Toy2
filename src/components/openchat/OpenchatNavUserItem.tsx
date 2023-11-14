import React from 'react';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import { User } from '../../types/User';
import { OpenchatFriendWrap } from '../../styles/OpenchatStyle';

interface OpenchatNavUserItemProps {
  user: User;
}

function OpenchatNavUserItem({ user }: OpenchatNavUserItemProps) {
  // const style = { border: `2px solid ${colors[i]}` };
  return (
    <motion.li>
      <OpenchatFriendWrap>
        <div className="openchat__friend-img">
          <img src={user.picture} alt={user.name} />
        </div>
        <div className="openchat__friend-text">
          <Typography variant="body1" className="openchat__friend-name">
            {user.name} ({user.id})
          </Typography>
        </div>
        {/* <div className="openchat__friend-send">
        <Tooltip title="메시지">
          <Send sx={{ width: '20px' }} />
        </Tooltip>
      </div> */}
      </OpenchatFriendWrap>
    </motion.li>
  );
}
export default OpenchatNavUserItem;
