import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatType, UserType } from '../types/ChatType';
import useCreateChat from './useCreateChat';

const useCreateOrJoinChat = (
  accessToken: string | null,
  chatList: ChatType[],
  selectedUser: UserType,
  userInfo: UserType | null,
) => {
  const navigate = useNavigate();
  const chatName = [selectedUser.name, userInfo?.name].sort().join(',');
  const createChat = useCreateChat(accessToken, chatName, selectedUser.id);

  const handleCreateOrJoinChat = async () => {
    const findChat: ChatType = chatList.find(
      (chat: ChatType) => chat.name === chatName,
    )!;

    if (findChat) {
      navigate(`/chat/${findChat.id}`);
      return;
    }

    const data: ChatType = await createChat();
    navigate(`/chat/${data.id}`);
  };

  return handleCreateOrJoinChat;
};

export default useCreateOrJoinChat;
