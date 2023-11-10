/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { Box, Button, Grid, Menu, MenuItem } from '@mui/material';

interface SignUpSelectItemProps {
  name: string;
  flag: string;
  setLangLv: (name: string, lv: number) => void;
  isClicked: boolean;
}

function SignUpSelectItem({
  name,
  flag,
  setLangLv,
  isClicked = false,
}: SignUpSelectItemProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (lv: number) => {
    setLangLv(name, lv);
    setAnchorEl(null);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <Grid
      item
      xs={6}
      // onClick={handleClick}
      sx={{
        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          backgroundColor: isClicked ? '#A8DADC' : '#F5F5F5',
          p: 2,
          borderRadius: 2,
          position: 'relative',
          transition: '.3s background-color',
        }}
      >
        <Button
          fullWidth
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickBtn}
          sx={{
            img: {
              width: '30px',
              marginRight: '10px',
            },
          }}
        >
          <img src={flag} alt={name} />
          {name}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose(1);
            }}
          >
            Lv1. 초급
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose(2);
            }}
          >
            Lv2. 중급
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose(3);
            }}
          >
            Lv3. 고급
          </MenuItem>
        </Menu>
      </Box>
    </Grid>
  );
}

export default React.memo(SignUpSelectItem);
