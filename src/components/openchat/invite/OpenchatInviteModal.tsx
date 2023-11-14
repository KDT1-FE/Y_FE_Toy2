import React, { useCallback, useState } from 'react';
import { Modal } from '@mui/material';
import { Clear } from '@mui/icons-material';
import * as S from '../../../styles/chat/ChatListStyles';
import OpenchatInviteFriends from './OpenchatInviteFriends';
import { User } from '../../../types/User';

interface OpenchatInviteModalProps {
  open: boolean;
  handleClose: () => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  allUsers: User[];
}

function OpenchatInviteModal2({
  open,
  handleClose,
  handleSearch,
  allUsers,
}: OpenchatInviteModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

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
          <S.Title>대화 상대 초대</S.Title>
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
            allUsers={allUsers}
            onClickSelectBtn={onClickSelectBtn}
            selectedIds={selectedIds}
          />
        </S.ModalUserList>

        <S.ModalFooter>
          <S.StartChatBtn
            type="button"
            variant="contained"
            // disabled={!selectedUser.id}
            onClick={() => {}}
          >
            채팅방에 초대하기
          </S.StartChatBtn>
        </S.ModalFooter>
      </S.ModalWrapper>
    </Modal>
  );
}

export default OpenchatInviteModal2;
