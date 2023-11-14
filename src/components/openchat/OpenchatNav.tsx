import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import useDimensions from '../../hooks/useDimensions';
import OpenchatNavItems from './OpenchatNavItems';

import styles from './OpenchatNav.module.css';
import { User } from '../../types/User';
import { Chat } from '../../types/Openchat';

interface OpenchatNavProps {
  data?: Chat;
  users: User[];
  allUsers: User[];
}

function OpenchatNav({ data, users, allUsers }: OpenchatNavProps) {
  return (
    <motion.nav
      initial={{ x: '100%' }}
      animate={{
        x: 0,
      }}
      exit={{
        x: '100%',
      }}
      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
      className={styles.nav}
    >
      <div>
        {users.map((user) => (
          <div>
            <img src={user.picture} alt={user.name} />
            <p>{user.name}</p>
          </div>
        ))}
      </div>
      {/* <div>
        추가할 유저{' '}
        {allUsers.map((user) => (
          <p>{user.name}</p>
        ))}
      </div> */}
    </motion.nav>
  );
}
OpenchatNav.defaultProps = {
  data: null,
};

export default OpenchatNav;
