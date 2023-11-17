import React, { useCallback, useMemo, useState } from 'react';
import { Modal } from '@mui/material';
import { Clear } from '@mui/icons-material';
import * as S from '../../../styles/chat/ChatListStyles';
import OpenchatInviteFriends from './OpenchatInviteFriends';
import { User } from '../../../types/User';
import { filterInviteUsers } from '../../../utils/filterOpenChats';
import useMutationOpenchatPatchs from '../../../hooks/useMutationOpenchatPatchs';

interface OpenchatInviteModalProps {
  open: boolean;
  handleClose: () => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  users: User[];
  allUsers: User[];
  chatId: string;
  getOpenchatData: () => Promise<void>;
}

function OpenchatInviteModal2({
  open,
  handleClose,
  handleSearch,
  users,
  allUsers,
  chatId,
  getOpenchatData,
}: OpenchatInviteModalProps) {
  const usersId = users.map((user) => user.id); // 현재 참여한 유저들의 아이디만 분류
  // 초대 유저 목록을 보여주기 위해 전체 유저에서 참여한 유저들 제거
  const currentUser = useMemo(
    () => filterInviteUsers(allUsers, usersId),
    [allUsers, usersId],
  );
  const [selectedIds, setSelectedIds] = useState<string[]>([]); // 선택된 유저들 정보
  const { invite } = useMutationOpenchatPatchs();

  const onClickSelectBtn = useCallback(
    (value: string) => {
      if (selectedIds.includes(value)) {
        const newArray = selectedIds.filter((id) => id !== value);
        setSelectedIds(newArray);
      } else {
        setSelectedIds((prev) => [...prev, value]);
      }
    },
    [selectedIds, setSelectedIds],
  );

  const onClickInvite = async () => {
    await invite(chatId, selectedIds);
    await getOpenchatData();
    handleClose();
    setSelectedIds([]);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <S.ModalWrapper>
        <S.ModalHeader>
          <S.EmptyBox />
          <S.ModalTitle>대화 상대 초대</S.ModalTitle>
          <S.CancelBtn onClick={handleClose}>
            <Clear />
          </S.CancelBtn>
        </S.ModalHeader>

        <S.ModalPartnerSearch>
          <S.Partner>초대할 사람:</S.Partner>
          <S.SearchInput
            placeholder="채팅방에 초대할 상대방의 이름을 검색하세요."
            onChange={handleSearch}
          />
        </S.ModalPartnerSearch>

        <S.ModalUserList>
          <OpenchatInviteFriends
            allUsers={currentUser}
            onClickSelectBtn={onClickSelectBtn}
            selectedIds={selectedIds}
          />
        </S.ModalUserList>

        <S.ModalFooter>
          <S.StartChatBtn
            type="button"
            variant="contained"
            disabled={!selectedIds.length}
            onClick={onClickInvite}
          >
            채팅방에 초대하기
          </S.StartChatBtn>
        </S.ModalFooter>
      </S.ModalWrapper>
    </Modal>
  );
}

export default OpenchatInviteModal2;
