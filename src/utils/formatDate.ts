export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'long', // 'long'은 월의 이름을 전체로 표시
    day: 'numeric', // 'numeric'은 일을 숫자로 표시
  };

  const formatter = new Intl.DateTimeFormat('ko-KR', options);

  return formatter.format(date);
};

export const formatDateTime = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false, // 24시간 형식 사용
  };

  const formatter = new Intl.DateTimeFormat('ko-KR', options);

  return formatter.format(date);
};

export const isToday = (dateStr: string): boolean => {
  const date = new Date(dateStr).toDateString();
  const today = new Date().toDateString();
  if (date === today) return true;
  return false;
};
