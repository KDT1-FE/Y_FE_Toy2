/**
 * 시민을 제외한 특수 직업을 부여받을 user의 index를 결정한다.
 */
const checkMafia = (usersLength: number) => {
  const mafiaNum = Math.floor(usersLength / 3);
  const specialIndex: number[] = [];

  for (let i = 0; i < mafiaNum; i++) {
    const randomNumber = Math.floor(Math.random() * usersLength);

    if (specialIndex.includes(randomNumber)) {
      i--;
    } else {
      specialIndex.push(randomNumber);
    }
  }

  return specialIndex;
};

export default checkMafia;
