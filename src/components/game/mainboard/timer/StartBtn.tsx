import React from 'react';
import { motion } from 'framer-motion';
import {
  CurrentRateType,
  StartType,
  TimeType,
  WordsType,
} from '../../gameType';

type Props = Pick<StartType, 'setStart'> &
  Pick<TimeType, 'setTime'> &
  Pick<WordsType, 'setWords'> &
  Pick<CurrentRateType, 'setCurrentRate'>;

export default function StartBtn({
  setTime,
  setStart,
  setWords,
  setCurrentRate,
}: Props) {
  const buttonVariants = {
    hover: {
      scale: 1.1,
      backgroundColor: '#3498db',
    },
    pressed: {
      scale: 0.9,
      backgroundColor: '#2980b9',
    },
  };

  function randomAlphabet() {
    const returnAlphabet = [];
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    returnAlphabet.push(alphabet.charAt(randomIndex));
    setWords(returnAlphabet);
  }

  function gameStart() {
    setStart(true);
    randomAlphabet();
    setCurrentRate(0);
  }
  return (
    <div>
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="pressed"
        style={{
          width: '150px',
          height: '150px',
          fontSize: '30px',
          border: 'none',
          borderRadius: '150px',
          cursor: 'pointer',
          outline: 'none',
          fontWeight: 'bold',
          letterSpacing: '1px',
          boxShadow: '0px 5px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#2980b9',
          color: '#fff',
        }}
        onClick={() => {
          gameStart();
          setTime(5);
        }}
      >
        Start
      </motion.button>
    </div>
  );
}
