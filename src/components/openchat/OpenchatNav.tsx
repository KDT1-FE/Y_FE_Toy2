import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import useDimensions from '../../hooks/useDimensions';
import OpenchatNavItems from './OpenchatNavItems';

import styles from './OpenchatNav.module.css';

const sidebar = {
  open: (height = 1000) => ({
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  }),
  closed: {
    x: 300,
    transition: {
      delay: 0.2,
      type: 'spring',
      stiffness: 100,
    },
  },
};

function OpenchatNav() {
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
      네비게이션!
    </motion.nav>
  );
}

export default OpenchatNav;
