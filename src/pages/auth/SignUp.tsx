import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import SignUpForm from '../../components/auth/SignUpForm';
import SignUpForm2 from '../../components/auth/SignUpForm2';
import SignUpForm3 from '../../components/auth/SignUpForm3';
import SignUpForm4 from '../../components/auth/SignUpForm4';

export interface SignUpFormProps {
  setStep?: (value: number) => void;
}

function SignUp() {
  const [step, setStep] = useState(1);

  return (
    <Container sx={{ height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80%',
        }}
      >
        {step === 1 && <SignUpForm setStep={setStep} />}
        {step === 2 && <SignUpForm2 setStep={setStep} />}
        {step === 3 && <SignUpForm3 setStep={setStep} />}
        {step === 4 && <SignUpForm4 />}
      </Box>
    </Container>
  );
}

export default SignUp;
