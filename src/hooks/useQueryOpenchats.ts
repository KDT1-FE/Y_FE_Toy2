/* eslint-disable no-console */
import React, { useEffect, useState, useMemo } from 'react';
import { isAxiosError } from 'axios';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { privateApi } from '../libs/axios';
import { db } from '../firebaseSDK';
import { ChatInfo, ChatInfoConverter } from '../libs/firestoreChatConverter';
import filterObjectsById from '../utils/filterOpenChats';
import { Chat, Chats } from '../types/Openchat';

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

  const filteredOpenchats = useMemo(
    () => filterObjectsById(openchats, chats),
    [chats, openchats],
  );

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  return {
    isQuering,
    openchats,
  };
}

export default useQueryOpenchats;
