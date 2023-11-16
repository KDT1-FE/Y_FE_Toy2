export interface JoinData {
  id: string;
  password: string;
  name: string;
  picture?: string;
}

export interface FormData extends JoinData {
  confirmPassword: string; // JoinData에서 confirmPassword만 추가
}

export interface ValidationInput {
  fieldName: keyof FormData;
  value: string;
  formData: FormData;
}

export interface ChatResponse {
  chats: Chat[];
}

export interface OnlyResponse {
  chat: Chat[];
}

export interface Chat {
  id: string;
  name: string;
  users: User[]; // 속한 유저 id
  isPrivate: boolean;
  updatedAt: Date;
  createdAt: Date;
  index: number;
}

export interface User {
  id: string;
  name: string;
  picture: string;
}
