import React, { useState, useEffect } from 'react';
import { Modal } from '@mui/material';
import { Clear, MapsUgcRounded } from '@mui/icons-material';
import { useRecoilValue } from 'recoil';
import Hangul from 'hangul-js';
import { accessTokenState } from '../../atoms';
import useChatAll from '../../hooks/useChatAll';
import useUserAll from '../../hooks/useUserAll';
import UserCard from '../../components/chat/UserCard';
import * as S from '../../styles/chat/ChatListStyles';
import { UserType } from '../../types/ChatType';
import Chats from '../../components/chat/Chats';
import useGetUserInfo from '../../hooks/useGetUserInfo';
import useCreateOrJoinChat from '../../hooks/useCreateOrJoinChat';

function ChatList() {
  const accessToken = useRecoilValue(accessTokenState);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType>({
    id: '',
    name: '',
    picture: '',
  });
  const [userList, setUserList] = useState([]);
  const userInfo = useGetUserInfo(accessToken);
  const userAllList = useUserAll(accessToken).filter(
    (user: UserType) => user.id !== userInfo?.id,
  );

  const chatList = useChatAll(accessToken);
  const handleCreateOrJoinChat = useCreateOrJoinChat(
    accessToken,
    chatList,
    selectedUser,
    userInfo,
  );

  const handleModal = (): void => {
    setOpen(!open);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const searchList = userAllList.filter(
      (user: UserType) => Hangul.search(user.name, e.target.value.trim()) >= 0,
    );

    setUserList(searchList);
  };

  useEffect(() => {
    setUserList(userAllList);
  }, [userAllList.length]);

  return (
    <S.Wrapper>
      <Chats chatList={chatList} />

      <S.NewMessageWrapper>
        <S.NewMessageImgBox>
          <MapsUgcRounded
            sx={{
              width: '100%',
              height: '100%',
              color: 'primary.main',
            }}
          />
        </S.NewMessageImgBox>
        <S.NewMessageTitle>내 메시지</S.NewMessageTitle>
        <S.NewMessageBody>새로운 메시지를 보내보세요</S.NewMessageBody>
        <S.NewMessageBtn
          onClick={handleModal}
          variant="contained"
          type="button"
        >
          메시지 보내기
        </S.NewMessageBtn>
        <Modal
          open={open}
          onClose={handleModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <S.ModalWrapper>
            <S.ModalHeader>
              <S.EmptyBox />
              <S.ModalTitle>새로운 메시지</S.ModalTitle>
              <S.CancelBtn onClick={handleModal}>
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
                <S.UserNotFound>계정을 찾을 수 없습니다.</S.UserNotFound>
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
