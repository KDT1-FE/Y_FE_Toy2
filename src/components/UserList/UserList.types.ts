import {User} from 'types/chatroom.types';

export interface IUserList {
  chatId: string;
  usersMap?: Record<string, User>;
}
