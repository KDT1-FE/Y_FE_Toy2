export interface ChatUser {
  imageUrl: string;
  nickname: string;
}

export interface Chat {
  id: number;
  user: ChatUser;
  text: string;
}
