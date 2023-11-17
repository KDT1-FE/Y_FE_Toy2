/* eslint-disable import/prefer-default-export */
import { styled } from '@mui/material';

export const AuthContainer = styled('div')({
  maxWidth: '640px',
  margin: '0 auto',
  height: '100%',
});

export const AuthBgWrap = styled('div')({
  maxWidth: '480px',
  margin: '0 auto',
});

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const SignUpSelectLevel = styled('div')({
  position: 'absolute',
  top: '100%',
  left: 0,
  width: '100%',
  zIndex: 1,
});
