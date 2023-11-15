import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDoc,
  getDocs,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Dispatch } from 'react';
import { setTimeout } from 'timers/promises';
import { db, storage } from '../firebaseSDK';

export interface UserData {
  correct?: number;
  name?: string;
  image?: string;
  language?: string;
  level?: string;
  hashtags?: string[];
  intro?: string;
  id?: string;
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

// 회원정보 읽기 함수
export const getUserData = async (id: string) => {
  const docRef = doc(db, 'user', id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
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
  id: string,
  setRate: Dispatch<React.SetStateAction<number>>,
) => {
  const users: { name: string; correct: number }[] = [];
  const userData = await getDocs(collection(db, 'user'));
  userData.docs.forEach((doc) => {
    users.push({ name: doc.data().name, correct: doc.data().correct });
    if (doc.id === id) {
      setRate(doc.data().correct);
    }
  });
  setPeoples(users);
};

// 회원정보 업데이트 함수
export const updateData = async (
  id: string,
  userData: UserData | UserCorrect,
) => {
  const docRef = doc(db, 'user', id);
  const update = await updateDoc(docRef, { ...userData });
  return true;
};

// 랭킹 업데이트 함수
export const updateRate = async (
  setPeoples: Dispatch<
    React.SetStateAction<{ name: string; correct: number }[]>
  >,
  id: string,
  setRate: Dispatch<React.SetStateAction<number>>,
  userData: UserData | UserCorrect,
) => {
  const update = await updateData(id, userData);
  getRate(setPeoples, id, setRate);
  return true;
};
