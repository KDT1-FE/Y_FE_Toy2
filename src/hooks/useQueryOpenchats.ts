/* eslint-disable no-console */
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { isAxiosError } from 'axios';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { privateApi } from '../libs/axios';
import { db } from '../firebaseSDK';
import { ChatInfo, ChatInfoConverter } from '../libs/firestoreChatConverter';
import { Chat, Chats } from '../types/Openchat';
import filterOpenChats from '../utils/filterOpenChats';

export type ChatInfoWithId = ChatInfo & {
  id: string;
};
export type Openchat = ChatInfo & Chat;

function useQueryOpenchats() {
  const [chats, setChats] = useState<Chat[]>();
  const [openchats, setOpenchats] = useState<ChatInfoWithId[]>();
  const [isQuering, setIsQuering] = useState(false);

  const getOpenchats = async (arr?: string[]) => {
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

  const myOpenChat = useMemo(
    () => filterOpenChats(openchats, chats),
    [openchats, chats],
  );

  const getOpenchatsAndMychat = useCallback(async () => {
    setIsQuering(true);
    try {
      // 모든 채팅방 조회
      const data = await Promise.all([
        privateApi.get<Chats>('chat'),
        getOpenchats(),
      ]);

      setChats(data[0].data.chats);
      setOpenchats(data[1]);
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
    openchats,
    myOpenChat,
    fetchingData: getOpenchatsAndMychat,
  };
}

export default useQueryOpenchats;
