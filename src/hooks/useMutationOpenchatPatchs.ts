import React, { useCallback } from 'react';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { privateApi } from '../libs/axios';

function useMutationParticipate() {
  const navigate = useNavigate();
  const participate = useCallback(async (chatId: string) => {
    try {
      const { data } = await privateApi.patch('chat/participate', {
        chatId,
      });
      navigate(`/open/${data.id}`);
      toast.success(`${data.name}방에 참여했습니다.`);
    } catch (error) {
      // 에러 발생시 toast로 메시지 보여주기
      if (isAxiosError(error)) toast.error('참여하는중에 오류가 발생했습니다.');
    }
  }, []);
  const leave = useCallback(async (chatId: string) => {
    try {
      const { data } = await privateApi.patch('chat/leave', {
        chatId,
      });
      navigate(`/open`);
      toast.success(`오픈채팅방에서 나갔습니다.`);
    } catch (error) {
      // 에러 발생시 toast로 메시지 보여주기
      if (isAxiosError(error)) toast.error('나가는중에 오류가 발생했습니다.');
    }
  }, []);

  return { participate, leave };
}

export default useMutationParticipate;
