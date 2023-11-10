/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import { MapsUgc } from '@mui/icons-material';
import { AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import {
  OpenchatCreateChatModal,
  OpenchatCreateChatWrap,
} from '../../styles/OpenchatStyle';
import Cropper from '../common/Cropper';
import { newChatValidationSchema } from '../../utils/validateSchema';
import { tags } from '../auth/SignUpForm4';
import IOSSwitch from '../../styles/IOSSwitch';
import { UserSimple } from '../../types/User';

interface OpenchatCreateProps {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  allUsers: UserSimple[];
}

const ALL_HASHTAG = [...tags.hobby, ...tags.sports, ...tags.animal];
const allTags = ALL_HASHTAG.filter(
  (item, i) => ALL_HASHTAG.findIndex((item2) => item.tag === item2.tag) === i,
);

function OpenchatCreate({
  selectedId,
  setSelectedId,
  allUsers,
}: OpenchatCreateProps) {
  const [preview, setPreview] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [invitedUser, setInvitedUser] = useState<string[]>([]);
  const handleAutocompleteChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string[],
  ) => {
    setHashtags(value);
  };
  const handleUserSelectChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string[],
  ) => {
    const invited = [...value];
    const invitedId = invited.map((user) => user.split('(id:')[1].slice(0, -1));
    setInvitedUser(invitedId);
  };
  const formik = useFormik({
    initialValues: {
      isPrivate: false,
      name: '',
    },
    validationSchema: newChatValidationSchema,
    onSubmit: (values) => {
      // console.log(values);
      // console.log(hashtags);
      // console.log(invitedUser);

      setSelectedId(null);
      setHashtags([]);
      setPreview('');
    },
    onReset: () => {
      console.log('close clicked');
      setSelectedId(null);
      setHashtags([]);
      setPreview('');
    },
  });

  return (
    <OpenchatCreateChatWrap isOpen={selectedId}>
      <AnimatePresence>
        {selectedId && (
          <OpenchatCreateChatModal layoutId={selectedId}>
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
                onChange={handleAutocompleteChange}
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
                  />
                )}
                sx={{ marginBottom: '10px' }}
              />
              <Autocomplete
                multiple
                id="users"
                options={allUsers.map(
                  (option) => `${option.name} (id:${option.id})`,
                )}
                onChange={handleUserSelectChange}
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
                    label="초대할 친구를 선택해주세요."
                    placeholder="이름을 입력후 Enter를 눌러주세요."
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
              >
                만들기
              </Button>
            </form>
          </OpenchatCreateChatModal>
        )}
      </AnimatePresence>
    </OpenchatCreateChatWrap>
  );
}

export default OpenchatCreate;
