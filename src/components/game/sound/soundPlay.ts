import React from 'react';
import 성공 from './source/성공.mp3';
import 실패 from './source/실패.mp3';
import 시작 from './source/시작.mp3';
import 종료 from './source/종료.mp3';

function soundPlay(situation: string) {
  let audio: HTMLAudioElement | undefined;
  if (situation === 'success') {
    audio = new Audio(성공);
  } else if (situation === 'error') {
    audio = new Audio(실패);
  } else if (situation === 'start') {
    audio = new Audio(시작);
  } else if (situation === 'end') {
    audio = new Audio(종료);
  }
  if (audio) {
    audio.play();
  }
}

export default soundPlay;
