import React from 'react';
import { Cycle, motion } from 'framer-motion';
import { Box, Button, Typography } from '@mui/material';
import { User } from '../../types/User';
import { Chat } from '../../types/Openchat';
import OpenchatNavUsers from './OpenchatNavUsers';
import styles from './OpenchatNav.module.css';

interface OpenchatNavProps {
  data?: Chat;
  users: User[];
  allUsers: User[];
  toggleModalOpen: (state: string | null) => void;
}

function OpenchatNav({
  data,
  users,
  allUsers,
  toggleModalOpen,
}: OpenchatNavProps) {
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
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ flex: '1' }}>
          <Typography variant="h6" p={2}>
            대화상대
          </Typography>
          <OpenchatNavUsers users={users} toggleModalOpen={toggleModalOpen} />
        </Box>
        <div>
          <Button variant="outlined" fullWidth>
            채팅 나가기
          </Button>
        </div>
      </Box>
    </motion.nav>
  );
}
OpenchatNav.defaultProps = {
  data: null,
};

export default OpenchatNav;
