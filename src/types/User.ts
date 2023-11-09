export interface User {
  id: string;
  password: string;
  name: string;
  picture: string;
  chats: string[]; // chat id만 속합니다.
}
