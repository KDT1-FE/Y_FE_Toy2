import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import { validationSchema2 } from '../../utils/validateSchema';
import type { SignUpFormProps } from '../../pages/auth/SignUp';
import { VisuallyHiddenInput } from '../../styles/AuthStyles';
import { signUpFormState } from '../../atoms';
import convertBase64 from '../../utils/FileToBase64';
import Cropper from '../common/Cropper';

function SignUpForm2({ setStep }: SignUpFormProps) {
  const [preview, setPreview] = useState<string>();
  const setSignUpForm = useSetRecoilState(signUpFormState);

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
        const newForm = {
          ...prev,
          picture: preview ?? '',
          name: values.name,
          intro: values.intro,
        };
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
        <Cropper preview={preview ?? ''} setPreview={setPreview} />

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
        <Button
          color="primary"
          size="large"
          variant="contained"
          fullWidth
          type="submit"
          sx={{ mt: 3 }}
        >
          다음 단계로 ( 2 / 4 )
        </Button>
      </form>
    </div>
  );
}

export default SignUpForm2;
