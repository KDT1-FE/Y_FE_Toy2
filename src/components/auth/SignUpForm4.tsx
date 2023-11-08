/* eslint-disable no-console */
import React, { useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import type { SignUpFormProps } from '../../pages/auth/SignUp';
import SignUpSelectTag from './SignUpSelectTag';
import { signUpFormState } from '../../atoms';
import { FbUser } from '../../types/User';

const tags = {
  hobby: [
    { name: 'Music', tag: '음악감상' },
    { name: 'Dance', tag: '춤' },
    { name: 'Traveling', tag: '여행' },
    { name: 'Cooking', tag: '요리' },
    { name: 'Movie', tag: '영화감상' },
    { name: 'Gaming', tag: '게임' },
  ],
  sports: [
    { name: 'Exercise', tag: '운동' },
    { name: 'Running', tag: '러닝' },
    { name: 'Football', tag: '축구' },
    { name: 'Basketball', tag: '농구' },
    { name: 'Baseball', tag: '야구' },
  ],
  animal: [
    { name: 'Dog', tag: '강아지' },
    { name: 'Cat', tag: '고양이' },
    { name: 'Flower', tag: '화분키우기' },
    { name: 'Tree', tag: '나무키우기' },
    { name: 'Farming', tag: '밭가꾸기' },
  ],
};

function SignUpForm4({ setStep }: SignUpFormProps) {
  const signUpForm = useRecoilValue(signUpFormState);
  const [clickedItem, setClickedItem] = useState(new Set<string>());
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newForm: FbUser = {
      ...signUpForm,
      hashtag: Array.from(clickedItem),
    };
    console.log(newForm);
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
        <Typography variant="h4" mt={5} mb={5}>
          관심사 선택
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
        <Button color="primary" size="large" variant="contained" fullWidth type="submit" sx={{ mt: 3 }}>
          LANGCHAT 시작하기
        </Button>
      </form>
    </div>
  );
}

export default SignUpForm4;
