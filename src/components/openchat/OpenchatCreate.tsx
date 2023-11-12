/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import { MapsUgc } from '@mui/icons-material';
import { AnimatePresence } from 'framer-motion';
import {
  OpenchatCreateChatModal,
  OpenchatCreateChatWrap,
} from '../../styles/OpenchatStyle';
import Cropper from '../common/Cropper';
import { tags } from '../auth/SignUpForm4';
import IOSSwitch from '../../styles/IOSSwitch';
import { UserSimple } from '../../types/User';
import useMutationNewOpenchat from '../../hooks/useMutationNewOpenchat';

interface OpenchatCreateProps {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  allUsers: UserSimple[];
  fetchingData: () => Promise<void>;
}

// 모든 해시태그 (중복을 제거)
const ALL_HASHTAG = [...tags.hobby, ...tags.sports, ...tags.animal];
const allTags = ALL_HASHTAG.filter(
  (item, i) => ALL_HASHTAG.findIndex((item2) => item.tag === item2.tag) === i,
);

function OpenchatCreate({
  selectedId,
  setSelectedId,
  allUsers,
  fetchingData,
}: OpenchatCreateProps) {
  // 오픈채팅 업로드 로직 Custom Hooks
  const {
    formik,
    preview,
    setPreview,
    handleAutocompleteChange,
    handleUserSelectChange,
    hashtagError,
    invitedError,
    isOpenchatCreating,
  } = useMutationNewOpenchat({ setSelectedId, fetchingData });

  const myInfo = JSON.parse(localStorage.getItem('user') ?? '{}');
  const otherUsers = useMemo(
    () => allUsers.filter((user) => user.id !== myInfo.id),
    [allUsers, myInfo.id],
  );

  return (
    <OpenchatCreateChatWrap isOpen={selectedId}>
      <AnimatePresence>
        {selectedId && (
          <OpenchatCreateChatModal layoutId={selectedId}>
            <Box>
              <Typography variant="h5" className="modal-title">
                <MapsUgc />
                오픈채팅 만들기
              </Typography>
              <Cropper preview={preview} setPreview={setPreview} />
              <form
                onSubmit={formik.handleSubmit}
                onReset={formik.handleReset}
                autoComplete="off"
              >
                <FormControlLabel
                  control={<IOSSwitch sx={{ m: 1 }} />}
                  name="isPrivate"
                  label="비밀 채팅방"
                  value={formik.values.isPrivate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{ margin: '30px 0 0' }}
                />
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="오픈채팅방 이름을 입력해주세요."
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  margin="normal"
                />
                <Autocomplete
                  multiple
                  id="hashtags"
                  options={allTags.map((option) => option.tag)}
                  onChange={(e, value) => handleAutocompleteChange(value)}
                  freeSolo
                  renderTags={(value: readonly string[], getTagProps) =>
                    value.map((option: string, index: number) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="filled"
                      label="#해시태그로 채팅방을 소개해보세요."
                      placeholder="입력후 Enter를 눌러주세요."
                      helperText="*태그는 1개이상 선택해주세요"
                      error={hashtagError}
                    />
                  )}
                  sx={{ marginBottom: '10px' }}
                />
                <Autocomplete
                  multiple
                  id="users"
                  options={otherUsers.map(
                    (option) => `${option.name} (id:${option.id})`,
                  )}
                  onChange={(e, value) => handleUserSelectChange(value)}
                  renderTags={(value: readonly string[], getTagProps) =>
                    value.map((option: string, index: number) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="filled"
                      label="초대할 친구를 선택해주세요."
                      placeholder="이름을 입력후 Enter를 눌러주세요."
                      helperText="*친구는 1명이상 선택해주세요"
                      error={invitedError}
                    />
                  )}
                />
                <Button type="reset" className="openchat__reset-btn">
                  취소
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  className="openchat__submit-btn"
                  disabled={isOpenchatCreating}
                  startIcon={
                    isOpenchatCreating && (
                      <CircularProgress color="primary" size={16} />
                    )
                  }
                >
                  만들기
                </Button>
              </form>
            </Box>
          </OpenchatCreateChatModal>
        )}
      </AnimatePresence>
    </OpenchatCreateChatWrap>
  );
}

export default OpenchatCreate;
