/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import * as React from 'react';
import { SVGMotionProps, motion } from 'framer-motion';
import { JSX } from 'react/jsx-runtime';
import styles from './MenuToggle.module.css';

function Path(
  props: JSX.IntrinsicAttributes &
    SVGMotionProps<SVGPathElement> &
    React.RefAttributes<SVGPathElement>,
) {
  return (
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke="hsl(0, 0%, 18%)"
      strokeLinecap="round"
      {...props}
    />
  );
}

interface MenuToggleProps {
  isOpen: boolean;
  toggle: () => void;
}

function MenuToggle({ isOpen, toggle }: MenuToggleProps) {
  return (
    <button onClick={toggle} className={styles.button}>
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          animate={isOpen ? 'open' : 'closed'}
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }}
        />
        <Path
          animate={isOpen ? 'open' : 'closed'}
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          animate={isOpen ? 'open' : 'closed'}
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }}
        />
      </svg>
    </button>
  );
}
export default MenuToggle;
