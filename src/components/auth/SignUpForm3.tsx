import React, { useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import type { SignUpFormProps } from '../../pages/auth/SignUp';
import SignUpSelectItem from './SignUpSelectItem';
import { signUpFormState } from '../../atoms';

const languages = [
  { name: 'English', flag: '/flag/eng.png', value: 'English' },
  { name: '日本語', flag: '/flag/jpn.png', value: 'Japanese' },
  { name: '中文', flag: '/flag/cn.png', value: 'Chinese' },
  { name: 'español', flag: '/flag/es.png', value: 'Spanish' },
  { name: 'français', flag: '/flag/fr.png', value: 'French' },
  { name: 'das Deutsche', flag: '/flag/de.png', value: 'German' },
  { name: 'Tiếng Việt', flag: '/flag/vn.png', value: 'Vietnamese' },
  { name: 'ภาษาไทย', flag: '/flag/tp.png', value: 'Thai' },
];

function SignUpForm3({ setStep }: SignUpFormProps) {
  const setSignUpForm = useSetRecoilState(signUpFormState);
  const [level, setLevel] = useState(0);
  const [clickedItem, setClickedItem] = useState('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (setStep) setStep(4);
    setSignUpForm((prev) => {
      const newForm = { ...prev, level: `${level}`, language: clickedItem };
      return newForm;
    });
  };
  const setLangLv = (name: string, lv: number) => {
    setClickedItem(name);
    setLevel(lv);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <Typography variant="h4" mb={5}>
          언어 및 수준 선택
        </Typography>
        <Grid container spacing={2}>
          {languages.map((language) => (
            <SignUpSelectItem
              key={language.name}
              name={language.name}
              flag={language.flag}
              value={language.value}
              setLangLv={setLangLv}
              isClicked={language.name === clickedItem}
            />
          ))}
        </Grid>
        <Button
          color="primary"
          size="large"
          variant="contained"
          fullWidth
          type="submit"
          sx={{ mt: 3 }}
        >
          다음 단계로 ( 3 / 4 )
        </Button>
      </form>
    </div>
  );
}

export default SignUpForm3;
