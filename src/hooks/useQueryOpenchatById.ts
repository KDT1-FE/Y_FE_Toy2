/* eslint-disable no-console */
import React, { useCallback, useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { privateApi } from '../libs/axios';
import { Chat } from '../types/Openchat';
import { User } from '../types/User';
import { filterOpenChatsUser } from '../utils/filterOpenChats';

interface Root {
  chat: Chat;
}

function useQueryOpenchatById(chatId: string) {
  const [isQuering, setIsQuering] = useState(false);
  const [data, setData] = useState<Chat>();
  const [users, setUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const getOpenchatData = useCallback(async () => {
    setIsQuering(true);
    try {
      const datas = await Promise.all([
        privateApi.get<Root>(`chat/only?chatId=${chatId}`),
        privateApi.get<User[]>('users'),
      ]);

      const chatUserIds = datas[0].data.chat.users.map((user) => user.id);
      const chatUsers = filterOpenChatsUser(datas[1].data, chatUserIds);
      setData(datas[0].data.chat);
      setUsers(chatUsers);
      setAllUsers(datas[1].data);
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.message);
      }
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
    users,
    allUsers,
    getOpenchatData,
  };
}

export default useQueryOpenchatById;
