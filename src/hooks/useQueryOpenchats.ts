/* eslint-disable no-console */
import React, { useEffect, useState, useMemo } from 'react';
import { isAxiosError } from 'axios';
import { collection, getDocs, query } from 'firebase/firestore';
import { privateApi } from '../libs/axios';
import { db } from '../firebaseSDK';
import { ChatInfo, ChatInfoConverter } from '../libs/firestoreChatConverter';
import filterObjectsById from '../utils/filterOpenChats';

interface Chats {
  chats: Chat[];
}
interface Chat {
  id: string;
  name: string;
  users: User[]; // 속한 유저 정보
  isPrivate: boolean;
  latestMessage: Message | null;
  updatedAt: Date;
}

interface User {
  id: string;
  name: string;
  picture: string;
}

interface Message {
  id: string;
  text: string;
  userId: string;
  createAt: Date;
}

type ChatInfoWithId = ChatInfo & {
  id: string;
};

function useQueryOpenchats() {
  const [chats, setChats] = useState<Chat[]>();
  const [openchats, setOpenchats] = useState<ChatInfoWithId[]>();
  const [isQuering, setIsQuering] = useState(false);

  const getOpenchats = async () => {
    const data: ChatInfoWithId[] = [];
    const q = query(
      collection(db, 'openchat').withConverter(ChatInfoConverter),
    );

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
        const {
          data: { chats },
        } = await privateApi.get<Chats>('chat/all');
        const openchats = await getOpenchats();
        setChats(chats);
        setOpenchats(openchats);
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
    openchats: filteredOpenchats,
  };
}

export default useQueryOpenchats;
