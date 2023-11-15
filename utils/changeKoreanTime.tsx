'use client';

import moment from 'moment-timezone';

export const koreanTime = (dateString: Date) => {
	return moment(dateString).tz('Asia/Seoul').format('HH : mm');
};
