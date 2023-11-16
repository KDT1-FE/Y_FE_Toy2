import { ChatI } from "../pages/Chat";

export const getTime = (chatData: []) => {
  const myRoom = chatData.map((room: ChatI) => {
    // 시간 계산
    const updatedAt = room.updatedAt;
    const givenDate: Date = new Date(updatedAt);
    const currentDate: Date = new Date();
    const timeDifference = currentDate.getTime() - givenDate.getTime();
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));

    let updatedAtString: string;

    if (minutesDifference < 1) {
      updatedAtString = "방금 전";
    } else if (minutesDifference < 60) {
      updatedAtString = `${minutesDifference}분 전`;
    } else {
      const hoursDifference = Math.floor(minutesDifference / 60);
      updatedAtString = `${hoursDifference}시간 전`;
    }

    return {
      ...room,
      updatedAt: updatedAtString
    };
  });

  return myRoom;
};
