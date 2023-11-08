import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import { validationSchema2 } from '../../utils/validateSchema';
import type { SignUpFormProps } from '../../pages/auth/SignUp';
import { VisuallyHiddenInput } from '../../styles/AuthStyles';
import { signUpFormState } from '../../atoms';

function SignUpForm2({ setStep }: SignUpFormProps) {
  const [base64Img, setBase64Img] = useState<string>();
  const convertBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  const setSignUpForm = useSetRecoilState(signUpFormState);
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      convertBase64(file).then((base64) => {
        setBase64Img(base64 as string);
      });
    }
  };
  const formik = useFormik({
    initialValues: {
      file: null,
      name: '',
      intro: '',
    },
    validationSchema: validationSchema2,
    onSubmit: (values) => {
      if (setStep) setStep(3);
      setSignUpForm((prev) => {
        const newForm = { ...prev, picture: base64Img ?? '', name: values.name, intro: values.intro };
        return newForm;
      });
      // console.log(values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Typography variant="h4" mb={5}>
          정보 입력
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Button
            component="label"
            variant="contained"
            sx={{
              width: '300px',
              height: '300px',
              borderRadius: '100%',
              p: 1,
              backgroundColor: 'lightgray',
              overflow: 'hidden',
              img: { width: '100%', height: '100%', objectFit: 'cover', borderRadius: '100%' },
            }}
          >
            {base64Img ? <img src={base64Img} alt="thumbnail" /> : <Typography variant="h4">+</Typography>}
            <VisuallyHiddenInput type="file" onChange={onChangeFile} />
          </Button>
        </Box>

        <TextField
          fullWidth
          id="name"
          name="name"
          label="이름"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          margin="normal"
        />
        <TextField
          fullWidth
          id="intro"
          name="intro"
          label="소개글"
          value={formik.values.intro}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.intro && Boolean(formik.errors.intro)}
          helperText={formik.touched.intro && formik.errors.intro}
          margin="normal"
        />
        <Button color="primary" size="large" variant="contained" fullWidth type="submit" sx={{ mt: 3 }}>
          다음 단계로 ( 2 / 4 )
        </Button>
      </form>
    </div>
  );
}

export default SignUpForm2;
