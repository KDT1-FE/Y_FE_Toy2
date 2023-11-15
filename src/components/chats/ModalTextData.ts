export const textModalData = {
  enter: '채팅방에 입장하시겠습니까?',
  out: '채팅방에서 나가시겠습니까?',
  enterBtn: '입장하기',
  outBtn: '나가기',
  cancelBtn: '취소',
};

export const eclipsText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};
