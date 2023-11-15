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
import { Chat, Chats } from '../types/Openchat';
import filterOpenChats, {
  filterOpenChatsNotMychat,
} from '../utils/filterOpenChats';
import { userInfoConverter } from '../libs/firestoreConverter';
import { userState } from '../atoms';
import { UserInfoWithId, UserSimple } from '../types/User';

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

  const getOpenchats = async () => {
    const data: ChatInfoWithId[] = [];
    const openchatRef = collection(db, 'openchat').withConverter(
      ChatInfoConverter,
    );
    const q = query(openchatRef);
    const querySn = await getDocs(q);
    querySn.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  };
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
    querySn.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
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
        getCategory(),
        getOpenchats(),
      ]);
      // 친구 조회
      const friends = await getFriends(data[1]);

      // 받아온 정보들 저장
      setChats(data[0].data.chats);
      setMyHashtags(data[1]);
      setOpenchats(data[2]);
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
