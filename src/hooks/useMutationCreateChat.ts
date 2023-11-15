import React, { useCallback, useState } from 'react';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { privateApi } from '../libs/axios';
import { db } from '../firebaseSDK';
import { ChatType } from '../types/ChatType';

function useMutationCreateChat() {
  const navigate = useNavigate();
  const [creatingId, setCreatingId] = useState('');
  const createNewChat = async (
    chatName: string,
    userId: string,
    myId: string,
  ) => {
    const { data } = await privateApi.post<ChatType>('chat', {
      name: chatName,
      users: [userId],
      isPrivate: false,
    });
    await updateDoc(doc(db, 'user', myId), {
      friends: arrayUnion(userId),
    });
    await updateDoc(doc(db, 'user', userId), {
      friends: arrayUnion(myId),
    });
    await setDoc(doc(db, 'chat', chatName), data);
    navigate(`/chat/${data.id}`);
  };

  const createDmChatOrJoin = useCallback(
    async (chatName: string, userId: string, myId: string) => {
      // console.log(chatName.split(','));
      setCreatingId(userId);
      try {
        const opponentRef = getDoc(doc(db, 'user', userId));
        const myRef = getDoc(doc(db, 'user', myId));
        const docSn = await Promise.all([opponentRef, myRef]);
        if (!docSn[0].exists() || !docSn[1].exists()) return;
        const opponentData = docSn[0].data();
        const myData = docSn[1].data();
        if (opponentData.friends && myData.friends) {
          const opponentisCreated = opponentData.friends.includes(myId);
          const isCreated = myData.friends.includes(userId);
          if (opponentisCreated || isCreated) {
            // 채팅방이 둘중하나에서 이미 생성되었다면
            const chatRef = await getDoc(doc(db, 'chat', chatName));
            if (chatRef.exists()) {
              const chatData = chatRef.data();
              navigate(`/chat/${chatData.id}`);
            }
          } else {
            // 채팅방이 없을경우
            const data = await createNewChat(chatName, userId, myId);
          }
        } else {
          // 채팅방 관련 데이터가 아에 없는경우
          const data = await createNewChat(chatName, userId, myId);
        }
      } catch (error) {
        if (isAxiosError(error))
          toast.error('채팅방을 생성하는데 문제가 있습니다.');
      } finally {
        setCreatingId('');
      }
    },
    [],
  );

  return { createDmChatOrJoin, creatingId };
}

export default useMutationCreateChat;
