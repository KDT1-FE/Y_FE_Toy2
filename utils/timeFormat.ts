interface TimeFormatResult {
  timeDiffText: string;
  className: string;
}

export default function formatTime(updatedAt: Date | string): TimeFormatResult {
  const now = new Date();
  const messageTime = new Date(updatedAt);
  const timeDiffInSeconds = (now.getTime() - messageTime.getTime()) / 1000;

  if (timeDiffInSeconds < 60) {
    return { timeDiffText: '방금', className: 'time-now' };
  }
  if (timeDiffInSeconds < 3600) {
    return { timeDiffText: '30분 전', className: 'time-minutes' };
  }
  if (timeDiffInSeconds < 86400) {
    return { timeDiffText: '1시간 전', className: 'time-hours' };
  }
  const days = Math.floor(timeDiffInSeconds / 86400);
  return { timeDiffText: `${days}일 전`, className: 'time-days' };
}
