import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { publicApi } from '../../libs/axios';

interface RequestBody {
  id: string; // 사용자 아이디 (필수!, 영어만)
  password: string; // 사용자 비밀번호, 5자 이상 (필수!)
  name: string; // 사용자 이름, 20자 이하 (필수!)
  picture?: string; // 사용자 이미지(url or base64, under 1MB)
}

function SignUpForm() {
  const [uid, setUid] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    publicApi.post('signup', {
      id: uid,
      password,
      name,
    } as RequestBody);
    // .then((response) => {
    //   console.log(response);
    // });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <TextField
          variant="outlined"
          label="아이디"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          margin="normal"
          autoComplete="off"
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          label="닉네임"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          autoComplete="off"
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          label="비밀번호 확인"
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          margin="normal"
        />
      </div>
      <Button type="submit">다음단계</Button>
    </form>
  );
}

export default SignUpForm;
