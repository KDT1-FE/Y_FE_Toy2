import React, { useEffect } from 'react';
import { Cycle, motion } from 'framer-motion';
import { Box, Button, Typography } from '@mui/material';
import { User } from '../../../types/User';
import { Chat } from '../../../types/OpenchatType';
import OpenchatNavUsers from './OpenchatNavUsers';
import styles from './OpenchatNav.module.css';
import useMutationOpenchatPatchs from '../../../hooks/useMutationOpenchatPatchs';

interface OpenchatNavProps {
  data?: Chat;
  users: User[];
  handleOpen: () => void;
}

function OpenchatNav({ data, users, handleOpen }: OpenchatNavProps) {
  const { leave } = useMutationOpenchatPatchs();
  const onClickLeave = () => {
    if (data) leave(data.id);
  };

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
          <OpenchatNavUsers users={users} handleOpen={handleOpen} />
        </Box>
        <div>
          <Button variant="outlined" fullWidth onClick={onClickLeave}>
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
