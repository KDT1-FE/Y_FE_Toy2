import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  onClick: () => void;
  text: string;
  className: string;
}
export default function Button({ onClick, text, className = '' }: ButtonProps) {
  console.log('Received className:', className);
  return (
    <button className={styles[className]} onClick={onClick} type="button">
      {text}
    </button>
  );
}
