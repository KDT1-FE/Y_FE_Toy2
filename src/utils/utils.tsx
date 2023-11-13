import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Dispatch } from 'react';
import { db, storage } from '../firebaseSDK';

export interface UserData {
  name?: string;
  image?: string;
  language?: string;
  level?: string;
  hashtags?: string[];
  intro?: string;
  id?: string;
  online?: boolean;
}

interface UserCorrect {
  correct?: number;
}

// 이미지 업로드 함수
export const addImage = async (image: File) =>
  new Promise<string | undefined>((resolve, reject) => {
    const filename = Date.now();
    const imageRef = ref(storage, `user/${filename}`);
    const uploadTask = uploadBytesResumable(imageRef, image);

    uploadTask.on(
      'state_changed',
      null,
      (error: unknown) => {
        reject(error);
      },
      async () => {
        try {
          const imageURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(imageURL);
        } catch (error) {
          reject(error);
        }
      },
    );
  });

// 회원정보 저장 함수
export const setData = (id: string, userData: UserData) => {
  setDoc(doc(db, 'user', id), userData);
};

// 언어별 회원정보 읽기 함수
export const getData = async (language: string): Promise<UserData[]> => {
  const q = query(collection(db, 'user'), where('language', '==', language));
  const querySnapshot = await getDocs(q);
  const docs: UserData[] = [];

  querySnapshot.forEach((doc) => {
    if (doc.exists()) {
      docs.push({
        id: doc.id,
        ...(doc.data() as UserData),
      });
    }
  });

  return docs;
};

// 회원 랭킹 읽기 함수
export const getRate = async (
  setPeoples: Dispatch<
    React.SetStateAction<{ name: string; correct: number }[]>
  >,
  name: string,
  setRate: Dispatch<React.SetStateAction<number>>,
) => {
  const users: { name: string; correct: number }[] = [];
  try {
    const userData = await getDocs(collection(db, 'user'));
    userData.docs.forEach((doc) => {
      users.push({ name: doc.data().name, correct: doc.data().correct });
      if (doc.data().name === name) {
        setRate(doc.data().correct);
      }
    });
  } catch (error) {
    console.log(error);
  } finally {
    setPeoples(users);
  }
};

// 회원정보 업데이트 함수
export const updateData = (id: string, userData: UserData | UserCorrect) => {
  const docRef = doc(db, 'user', id);
  updateDoc(docRef, { ...userData });
};
