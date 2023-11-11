// createdAt을 기준으로 시간순서로 정렬하는 함수
export const sortCreatedAt = (messages: any[]) => {
  return messages.sort((a: any, b: any) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
};

// createdAt을 날짜와 시간으로 분리하는 함수
export const createSeparatedTime = (createdAt: string) => {
  return {
    date: new Date(createdAt).toLocaleDateString().replace(/\.$/, ''), // 마지막의 마침표를 제거
    time: new Date(createdAt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
};
