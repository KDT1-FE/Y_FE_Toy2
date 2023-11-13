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

function OpenchatNav({ isOpen }: { isOpen: boolean }) {
  const containerRef = useRef<HTMLElement>(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      ref={containerRef}
      variants={sidebar}
      className={styles.nav}
    >
      <motion.div className={styles.background} />
      <OpenchatNavItems />
    </motion.nav>
  );
}

export default OpenchatNav;
