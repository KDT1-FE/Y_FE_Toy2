import React from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import { Send } from '@mui/icons-material';
import { OpenchatSenderWrap } from '../../../styles/OpenchatStyle';

interface OpenchatSenderProps {
  message: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

function OpenchatSender({ message, onChange, onClick }: OpenchatSenderProps) {
  return (
    <OpenchatSenderWrap container>
      <Grid
        item
        xs={12}
        sm={12}
        md={2}
        sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}
      >
        hidden
      </Grid>
      <Grid item xs={12} sm={12} md={10}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            padding: '0.8rem',
            backgroundColor: 'grey.200',
          }}
          className=".openchat__sender-wrap"
        >
          <input
            type="text"
            value={message}
            onChange={onChange}
            placeholder="메시지를 입력해주세요"
            className="openchat__sender-input"
          />
          <Button onClick={onClick} sx={{ flex: '0 0 60px' }}>
            <Send />
          </Button>
        </Box>
      </Grid>
    </OpenchatSenderWrap>
  );
}

export default OpenchatSender;
