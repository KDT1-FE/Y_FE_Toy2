import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import toast from 'react-hot-toast';
import { isAxiosError } from 'axios';
import { UserInfo, userInfoConverter } from '../libs/firestoreConverter';
import { db, storage } from '../firebaseSDK';
import { FbUser, User } from '../types/User';
import dataUrlToFile from '../utils/dataUrltoFile';
import checkImageValidation from '../utils/fileValidation';
import { privateApi, publicApi } from '../libs/axios';

const useMutationSignUp = (type: string) => {
  const [isLoaded, setIsLoaded] = useState(true);

  const signUp = async (userData: FbUser) => {
    setIsLoaded(false);
    try {
      let url = '';
      // 유저 정보 Firestore에 저장
      const docRef = doc(db, 'user', userData.id).withConverter(
        userInfoConverter,
      );
      // 파일업로드 여부에 따라 로직을 다르게 구현
      if (userData.picture !== '') {
        // 업로드한 파일이 있을 때
        const image = await dataUrlToFile(userData.picture, userData.id, type);
        if (!checkImageValidation(image))
          throw new Error('올바르지 않은 이미지 입니다');
        const storageRef = ref(storage, `user/${userData.id}`);
        const uploadRef = await uploadBytes(storageRef, image).then(
          (snapshot) => snapshot.ref,
        );
        url = await getDownloadURL(uploadRef);
        const res = await publicApi.post('signup', {
          id: userData.id,
          password: userData.password,
          name: userData.name,
          picture: url,
        });
        const { message } = res.data;
        toast.success(message);
      } else {
        // 업로드한 파일이 없을 때
        const res = await publicApi.post('signup', {
          id: userData.id,
          password: userData.password,
          name: userData.name,
        });
        const { message } = res.data;
        toast.success(message);
      }

      const userInfo: UserInfo = {
        name: userData.name,
        image: url,
        language: userData.language,
        intro: userData.intro,
        level: userData.level,
        hashtags: userData.hashtags,
        correct: 0,
      };
      await setDoc(docRef, userInfo);
    } catch (error) {
      if (isAxiosError(error)) toast.error('회원가입중에 에러가 발생했습니다.');
      else if (error instanceof Error) toast.error(error.message);
    } finally {
      // 업로드 및 가입이 완료됨을 알림
      setIsLoaded(true);
    }
  };

  return {
    isLoaded,
    signUp,
  };
};

export default useMutationSignUp;
