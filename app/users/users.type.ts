import { User } from '@/types';

export type UserHasOnline = User & {
	isOnline: boolean;
};
