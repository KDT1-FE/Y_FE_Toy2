import React, { Dispatch } from 'react';

function timeLimit(
  start: boolean,
  setTime: Dispatch<React.SetStateAction<number>>,
) {
  if (start) {
    setTime(5);
  }
}

export default timeLimit;
