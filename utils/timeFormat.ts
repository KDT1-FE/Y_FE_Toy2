interface TimeFormatResult {
  timeDiffText: string;
  className: string;
}

export default function formatTime(updatedAt: Date | string): TimeFormatResult {
  const now = new Date();
  const messageTime = new Date(updatedAt);
  const timeDiffInSeconds = (now.getTime() - messageTime.getTime()) / 1000;

  if (timeDiffInSeconds < 300) {
    return { timeDiffText: '방금', className: 'time-now' };
  }

  if (timeDiffInSeconds < 1800) {
    // 30 minutes
    const minutesAgo = Math.floor(timeDiffInSeconds / 60);
    return { timeDiffText: `${minutesAgo}분 전`, className: 'time-now' };
  }

  if (timeDiffInSeconds < 3600) {
    return { timeDiffText: '30분', className: 'time-minutes' };
  }

  if (timeDiffInSeconds < 14400) {
    // 4시간 이내
    const hoursAgo = Math.floor(timeDiffInSeconds / 3600);
    return { timeDiffText: `${hoursAgo}시간 전`, className: 'time-hours' };
  }

  if (timeDiffInSeconds < 86400) {
    // 1일 이내 3시간 이후
    const hoursAgo = Math.floor(timeDiffInSeconds / 3600);
    return {
      timeDiffText: `${hoursAgo}시간 전`,
      className: 'time-hours-after',
    };
  }

  const days = Math.floor(timeDiffInSeconds / 86400);
  return { timeDiffText: `${days}일 전`, className: 'time-days' };
}
