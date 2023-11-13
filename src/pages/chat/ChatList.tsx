import React, { ChangeEvent, useState, useEffect, useCallback } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import { Clear, MapsUgcRounded } from '@mui/icons-material';
import { useRecoilValue } from 'recoil';
import Hangul from 'hangul-js';
import { useNavigate } from 'react-router-dom';
import ChatCard from '../../components/chat/ChatCard';
import { accessTokenState } from '../../atoms';
import useChatAll from '../../hooks/useChatAll';
import useUserAll from '../../hooks/useUserAll';
import UserCard from '../../components/chat/UserCard';
import * as S from '../../styles/chat/ChatListStyles';
import { ChatType, User } from '../../types/ChatType';
import useCreateChat from '../../hooks/useCreateChat';
import Chats from '../../components/chat/Chats';

function ChatList() {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>({
    id: '',
    name: '',
    picture: '',
  });
  const [userList, setUserList] = useState([]);
  const chatName = `${selectedUser.id}!@#$$#@!${selectedUser.name}`;
  const accessToken = useRecoilValue(accessTokenState);
  const userAllList = useUserAll(accessToken);
  const chatList = useChatAll(accessToken);
  const createChat = useCreateChat(accessToken, chatName, selectedUser.id);
  const navigate = useNavigate();

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

  const getUserList = useCallback(() => {
    setUserList(userAllList);
  }, [userAllList]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const searchList = userAllList.filter(
      (user: User) => Hangul.search(user.name, e.target.value.trim()) >= 0,
    );

    setUserList(searchList);
  };

  useEffect(() => {
    getUserList();
  }, [getUserList]);

  return (
    <S.Wrapper>
      <Chats chatList={chatList} />

      <S.NewMessageWrapper>
        <Box sx={{ width: '60px', height: '60px' }}>
          <MapsUgcRounded
            sx={{
              width: '100%',
              height: '100%',
              color: 'primary.main',
            }}
          />
        </Box>
        <Typography sx={{ fontSize: '1.25rem' }}>내 메시지</Typography>
        <Typography sx={{ fontSize: '0.825rem', color: '#737373' }}>
          새로운 메시지를 보내보세요
        </Typography>
        <Button onClick={handleOpen} variant="contained" type="button">
          메시지 보내기
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <S.ModalWrapper>
            <S.ModalHeader>
              <S.EmptyBox />
              <S.Title>새로운 메시지</S.Title>
              <S.CancelBtn onClick={handleClose}>
                <Clear />
              </S.CancelBtn>
            </S.ModalHeader>

            <S.ModalPartnerSearch>
              <S.Partner>받는 사람:</S.Partner>
              <S.SearchInput
                placeholder="메시지를 보낼 상대방의 이름을 검색하세요."
                onChange={handleSearch}
              />
            </S.ModalPartnerSearch>

            <S.ModalUserList>
              {userList.length > 0 ? (
                userList.map((user, index) => (
                  <UserCard
                    key={index}
                    user={user}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                  />
                ))
              ) : (
                <Typography sx={{ p: 2, color: '#737373' }}>
                  계정을 찾을 수 없습니다.
                </Typography>
              )}
            </S.ModalUserList>

            <S.ModalFooter>
              <S.StartChatBtn
                type="button"
                variant="contained"
                disabled={!selectedUser.id}
                onClick={handleCreateOrJoinChat}
              >
                메시지 보내기
              </S.StartChatBtn>
            </S.ModalFooter>
          </S.ModalWrapper>
        </Modal>
      </S.NewMessageWrapper>
    </S.Wrapper>
  );
}

export default ChatList;
