import React, { useCallback, useEffect, useState } from 'react';
import { privateApi } from '../libs/axios';
import { Chat } from '../types/Openchat';

interface Root {
  chat: Chat;
}

function useQueryOpenchatById(chatId: string) {
  const [isQuering, setIsQuering] = useState(false);
  const [data, setData] = useState<Chat>();

  const getOpenchatData = useCallback(async () => {
    setIsQuering(true);
    try {
      // chatId를 기준으로 방 상세 정보 가져오기
      // const docRef = doc(db, 'openchat', chatId).withConverter(
      //   ChatInfoConverter,
      // );
      // const docSn = await getDoc(docRef);
      // if (docSn.exists()) setData(docSn.data());
      const {
        data: { chat },
      } = await privateApi.get<Root>(`chat/only?chatId=${chatId}`);
      setData(chat);
    } catch (error) {
      //
    } finally {
      setIsQuering(false);
    }
  }, []);

  useEffect(() => {
    getOpenchatData();
  }, [getOpenchatData]);

  return {
    isQuering,
    data,
  };
}

export default useQueryOpenchatById;
