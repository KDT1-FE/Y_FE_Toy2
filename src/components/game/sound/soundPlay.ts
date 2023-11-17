import React from 'react';
import success from './source/success.mp3';
import error from './source/error.mp3';
import start from './source/start.mp3';
import end from './source/end.mp3';

function soundPlay(situation: string) {
  let audio: HTMLAudioElement | undefined;
  if (situation === 'success') {
    audio = new Audio(success);
  } else if (situation === 'error') {
    audio = new Audio(error);
  } else if (situation === 'start') {
    audio = new Audio(start);
  } else if (situation === 'end') {
    audio = new Audio(end);
  }
  if (audio) {
    audio.play();
  }
}

export default soundPlay;
