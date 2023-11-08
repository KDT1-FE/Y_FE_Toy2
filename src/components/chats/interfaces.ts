export interface Chat {
    id?: string;
    name?: string;
    isPrivate?: boolean;
    users?: User[];
    latestMessage?: Message | null;

    updatedAt?: Date;
}

export interface Message {
    id: string;
    text: string;
    userId: string;

    createdAt: Date;
}

export interface User {
    id: string;
    password: string;
    name: string;
    picture: string;
    chats: string[]; // chat id만 속합니다.
    username: string;
}
