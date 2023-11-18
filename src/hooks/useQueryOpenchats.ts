/* eslint-disable no-console */
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { isAxiosError } from 'axios';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { useRecoilValue } from 'recoil';
import { privateApi } from '../libs/axios';
import { db } from '../firebaseSDK';
import { ChatInfo, ChatInfoConverter } from '../libs/firestoreChatConverter';
import { Chat, Chats } from '../types/OpenchatType';
import filterOpenChats, {
  filterAllOpenchats,
  filterOpenChatsNotMychat,
} from '../utils/filterOpenChats';
import { userInfoConverter } from '../libs/firestoreConverter';
import { userState } from '../atoms';
import { User, UserInfoWithId, UserSimple } from '../types/User';

export type ChatInfoWithId = ChatInfo & {
  id: string;
};
export type Openchat = ChatInfo & Chat;

function useQueryOpenchats() {
  const userInfo = useRecoilValue(userState);
  const [chats, setChats] = useState<Chat[]>();
  const [openchats, setOpenchats] = useState<ChatInfoWithId[]>();
  const [isQuering, setIsQuering] = useState(false);
  const [friends, setFriends] = useState<UserInfoWithId[]>();
  const [myHashtags, setMyHashtags] = useState<string[]>();

  const getAllOpenchats = async () => {
    const openchatIds: string[] = [];
    const openchatHashs: { id: string; hashtags: string[]; image: string }[] =
      [];
    const openchatSn = await getDocs(collection(db, 'openchat'));
    openchatSn.forEach((openchat) => {
      const openchatData = openchat.data();
      openchatIds.push(openchat.id);
      openchatHashs.push({
        id: openchat.id,
        hashtags: openchatData.hashtags,
        image: openchatData.image,
      });
    });

    const { data } = await privateApi.get<{ chats: Chat[] }>('chat/all');
    const openchats = filterAllOpenchats(data.chats, openchatIds);
    const newOpenchats = openchats
      .map((item1) => {
        const matchingItem = openchatHashs.find(
          (item2) => item1.id === item2.id,
        );
        if (matchingItem) {
          return {
            ...item1,
            hashtags: matchingItem.hashtags,
            image: matchingItem.image,
          };
        }
        return null; // 또는 다른 처리 방법을 선택할 수 있습니다.
      })
      .filter((item) => item !== null);
    return newOpenchats as ChatInfoWithId[];
  };

  // const getAllOpenchats = async () => {
  //   const data: ChatInfoWithId[] = [];
  //   const openchatRef = collection(db, 'openchat').withConverter(
  //     ChatInfoConverter,
  //   );
  //   const q = query(openchatRef);
  //   const querySn = await getDocs(q);
  //   querySn.forEach((doc) => {
  //     data.push({ id: doc.id, ...doc.data() });
  //   });
  //   return data;
  // };
  // 나의 관심사 가져오기
  const getCategory = async () => {
    const { id } = JSON.parse(userInfo) as UserSimple;
    const data: string[] = [];
    const userRef = doc(db, 'user', id).withConverter(userInfoConverter);
    const docSn = await getDoc(userRef);
    if (docSn.exists()) {
      const userData = docSn.data();
      return userData.hashtags;
    }
    return data;
  };
  // 친구 목록 가져오기
  const getFriends = async (arr: string[]) => {
    const data: UserInfoWithId[] = [];
    const openchatRef = collection(db, 'user').withConverter(userInfoConverter);
    const q = query(openchatRef, where('hashtags', 'array-contains-any', arr));
    const querySn = await getDocs(q);
    querySn.forEach(async (doc) => {
      const userData = doc.data();
      data.push({ id: doc.id, ...userData });
    });
    return data;
  };

  const myOpenChat = useMemo(
    () => filterOpenChats(openchats, chats),
    [openchats, chats],
  );

  const myChatIds = chats?.map((chat) => chat.id);
  const openchatsNotme = useMemo(
    () => filterOpenChatsNotMychat(openchats ?? [], myChatIds ?? []),
    [openchats, myChatIds],
  );

  const getOpenchatsAndMychat = useCallback(async () => {
    setIsQuering(true);
    try {
      // 모든 채팅방 조회
      const data = await Promise.all([
        privateApi.get<Chats>('chat'),
        getAllOpenchats(),
        getCategory(),
      ]);
      // 친구 조회
      const friends = await getFriends(data[2]);

      // 받아온 정보들 저장
      setChats(data[0].data.chats);
      setOpenchats(data[1]);
      setMyHashtags(data[2]);
      setFriends(friends);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.message);
      }
    } finally {
      setIsQuering(false);
    }
  }, []);

  return {
    isQuering,
    openchats: openchatsNotme,
    myOpenChat,
    friends,
    hashtags: myHashtags,
    fetchingData: getOpenchatsAndMychat,
  };
}

export default useQueryOpenchats;
