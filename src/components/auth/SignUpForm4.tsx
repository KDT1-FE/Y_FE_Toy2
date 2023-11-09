/* eslint-disable no-console */
import React, { useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import type { SignUpFormProps } from '../../pages/auth/SignUp';
import SignUpSelectTag from './SignUpSelectTag';
import { defaultSignUpValue, signUpFormState } from '../../atoms';
import { FbUser } from '../../types/User';
import useMutationSignUp from '../../hooks/useMutationSignUp';

const tags = {
  hobby: [
    { name: 'Music', tag: '음악감상' },
    { name: 'Dance', tag: '춤' },
    { name: 'Traveling', tag: '여행' },
    { name: 'Cooking', tag: '요리' },
    { name: 'Movie', tag: '영화감상' },
    { name: 'Gaming', tag: '게임' },
    { name: 'Drawing', tag: '그림' },
    { name: 'Book', tag: '독서' },
    { name: 'Painting', tag: '그림' },
  ],
  sports: [
    { name: 'Exercise', tag: '운동' },
    { name: 'Running', tag: '러닝' },
    { name: 'Football', tag: '축구' },
    { name: 'Basketball', tag: '농구' },
    { name: 'Baseball', tag: '야구' },
    { name: 'Swimming', tag: '수영' },
  ],
  animal: [
    { name: 'Dog', tag: '강아지' },
    { name: 'Cat', tag: '고양이' },
    { name: 'Plant', tag: '식물' },
  ],
};

function SignUpForm4({ setStep }: SignUpFormProps) {
  const navigate = useNavigate();
  const [signUpForm, setSignUpForm] = useRecoilState(signUpFormState);
  const type = signUpForm.picture.split(';')[0].slice(5);
  const { isLoaded, signUp } = useMutationSignUp(type);

  const [clickedItem, setClickedItem] = useState(new Set<string>());
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (clickedItem.size > 0 && clickedItem.size <= 5) {
      console.log('1~5개 까지 선택 가능합니다.');
      return;
    }
    const newForm: FbUser = {
      ...signUpForm,
      hashtag: Array.from(clickedItem),
    };
    // 회원가입 로직
    await signUp(newForm);
    // recoil 저장되어있는 정보 지우기
    setSignUpForm(defaultSignUpValue);
    // 메시지를 보여주고 이동시켜야 할것같은데 일단 이동하기
    navigate('/');
    // console.log(newForm);
  };
  const handleClick = (name: string) => {
    setClickedItem((prev) => {
      const newSet = new Set([...Array.from(prev)]);
      if (prev.has(name)) newSet.delete(name);
      else newSet.add(name);
      return newSet;
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Typography variant="h4" mt={5} mb={2}>
          관심사 선택
        </Typography>
        <Typography variant="body1" mb={5}>
          💡 1~5개 까지 선택 가능합니다.
        </Typography>
        <Typography variant="h5" mb={3}>
          취미/문화
        </Typography>
        <Grid container spacing={2} mb={5}>
          {tags.hobby.map((el) => (
            <SignUpSelectTag
              key={el.name}
              name={el.name}
              tag={el.tag}
              handleClick={() => {
                handleClick(el.tag);
              }}
              isClicked={clickedItem.has(el.tag)}
            />
          ))}
        </Grid>
        <Typography variant="h5" mb={3}>
          운동/스포츠
        </Typography>
        <Grid container spacing={2} mb={5}>
          {tags.sports.map((el) => (
            <SignUpSelectTag
              key={el.name}
              name={el.name}
              tag={el.tag}
              handleClick={() => {
                handleClick(el.tag);
              }}
              isClicked={clickedItem.has(el.tag)}
            />
          ))}
        </Grid>
        <Typography variant="h5" mb={3}>
          동물/식물
        </Typography>
        <Grid container spacing={2} mb={5}>
          {tags.animal.map((el) => (
            <SignUpSelectTag
              key={el.name}
              name={el.name}
              tag={el.tag}
              handleClick={() => {
                handleClick(el.tag);
              }}
              isClicked={clickedItem.has(el.tag)}
            />
          ))}
        </Grid>
        <Button color="primary" size="large" variant="contained" fullWidth type="submit" sx={{ my: 3 }}>
          {isLoaded ? 'LANGCHAT 시작하기' : '회원가입 진행중...'}
        </Button>
      </form>
    </div>
  );
}

export default SignUpForm4;
