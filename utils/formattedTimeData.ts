export const formattingTime = (time: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // 'string'이 아닌 'numeric' 리터럴 타입
    minute: 'numeric', // 'string'이 아닌 'numeric' 리터럴 타입
    hour12: true,
  };
  const timeString = new Date(time)
    .toLocaleTimeString('ko-KR', options)
    .replace('오전', '오전 ')
    .replace('오후', '오후 ');

  return timeString;
};

export const todayDate = (time: Date) => {
  const messageDate = new Date(time);
  const dateString = messageDate.toISOString().split('T')[0];
  return dateString;
};
