import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

export class UserInfo {
  constructor(
    public name: string,
    public image: string,
    public intro: string,
    public language: string,
    public level: string,
    public hashtags: string[],
    public correct: number = 0,
  ) {}
}

export const userInfoConverter: FirestoreDataConverter<UserInfo> = {
  toFirestore: (docData: UserInfo): DocumentData => ({
    name: docData.name,
    image: docData.image,
    intro: docData.intro,
    language: docData.language,
    level: docData.level,
    hashtags: docData.hashtags,
    correct: 0,
  }),
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions,
  ) => {
    const data = snapshot.data(options);
    return new UserInfo(
      data.name,
      data.image,
      data.intro,
      data.language,
      data.level,
      data.hashtags,
      data.correct,
    );
  },
};
