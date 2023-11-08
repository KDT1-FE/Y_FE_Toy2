import React from 'react';
import { useFormik } from 'formik';
import { Button, TextField, Typography } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import validationSchema from '../../utils/validateSchema';
import type { SignUpFormProps } from '../../pages/auth/SignUp';
import { signUpFormState } from '../../atoms';

function SignUpForm({ setStep }: SignUpFormProps) {
  const setSignUpForm = useSetRecoilState(signUpFormState);
  const formik = useFormik({
    initialValues: {
      id: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (setStep) setStep(2);
      setSignUpForm((prev) => {
        const current = { ...prev, id: values.id, password: values.password };
        return current;
      });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h4" mb={5}>
          회원가입
        </Typography>
        <TextField
          fullWidth
          id="id"
          name="id"
          label="아이디"
          value={formik.values.id}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.id && Boolean(formik.errors.id)}
          helperText={formik.touched.id && formik.errors.id}
          margin="normal"
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="비밀번호"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          margin="normal"
        />
        <TextField
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          label="비밀번호"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          margin="normal"
        />
        <Button color="primary" size="large" variant="contained" fullWidth type="submit" sx={{ mt: 3 }}>
          다음 단계로 ( 1 / 4 )
        </Button>
      </form>
    </div>
  );
}

export default SignUpForm;
