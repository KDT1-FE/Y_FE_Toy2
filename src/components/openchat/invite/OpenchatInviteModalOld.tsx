import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Box, Button, Typography } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import {
  OpenchatCreateChatModal,
  OpenchatCreateChatWrap,
} from '../../../styles/OpenchatStyle';
import { User } from '../../../types/User';
import OpenchatInviteFriends from './OpenchatInviteFriends';

interface OpenchatInviteModalProps {
  isModalOpen: string | null;
  toggle: (state: string | null) => void;
  allUsers: User[];
}

function OpenchatInviteModal({
  isModalOpen,
  toggle,
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
    <OpenchatCreateChatWrap isOpen={isModalOpen}>
      <AnimatePresence>
        {isModalOpen && (
          <OpenchatCreateChatModal>
            <Box>
              <Typography variant="h5" className="modal-title">
                <PersonAdd />
                친구 초대하기
              </Typography>
              <OpenchatInviteFriends
                allUsers={allUsers}
                onClickSelectBtn={onClickSelectBtn}
                selectedIds={selectedIds}
              />
              <Button
                type="reset"
                className="openchat__reset-btn"
                onClick={() => toggle(null)}
              >
                취소
              </Button>
              <Button
                type="submit"
                variant="contained"
                className="openchat__submit-btn"
                // disabled={isOpenchatCreating}
                // startIcon={
                //   isOpenchatCreating && (
                //     <CircularProgress color="primary" size={16} />
                //   )
                // }
              >
                초대하기
              </Button>
            </Box>
          </OpenchatCreateChatModal>
        )}
      </AnimatePresence>
    </OpenchatCreateChatWrap>
  );
}

export default OpenchatInviteModal;
