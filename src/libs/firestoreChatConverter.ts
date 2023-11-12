import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

interface User {
  id: string;
  name: string;
  picture: string;
}

// 채팅 정보 컨버터
export class ChatInfo {
  constructor(
    public name: string,
    public users: User[],
    public isPrivate: boolean,
    public updatedAt: Date,
    public hashtags: string[],
    public image: string,
  ) {}
}

export const ChatInfoConverter: FirestoreDataConverter<ChatInfo> = {
  toFirestore: (docData: ChatInfo): DocumentData => ({
    name: docData.name,
    users: docData.users,
    isPrivate: docData.isPrivate,
    updatedAt: docData.updatedAt,
    hashtags: docData.hashtags,
  }),
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ) => {
    const data = snapshot.data(options);
    return new ChatInfo(
      data.name,
      data.users,
      data.isPrivate,
      data.updatedAt,
      data.hashtags,
      data.image,
    );
  },
};
