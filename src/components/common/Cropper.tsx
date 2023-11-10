/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useRef, useState } from 'react';
import { Box, Modal, Slider, Button, Typography } from '@mui/material';
import AvatarEditor from 'react-avatar-editor';
import { FileUpload } from '@mui/icons-material';
import CropperContainer from '../../styles/CropperStyles';

/*-----------------------------------------
  Author: Ajay Prakash P P
  Date : 13/09/2022
  Github: https://github.com/mrAJAY1
  LinkedIn: https://www.linkedin.com/in/ajay-prakash-8767a9218/
  
  Current Domain : MERN stack
--------------------------------------------*/

// Styles
const boxStyle = {
  width: '300px',
  height: '300px',
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};
const modalStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

interface CropperModalProps {
  src: string;
  modalOpen: boolean;
  setModalOpen: (bool: boolean) => void;
  setPreview: (url: string) => void;
}

// Modal
function CropperModal({
  src,
  modalOpen,
  setModalOpen,
  setPreview,
}: CropperModalProps) {
  const [slideValue, setSlideValue] = useState(10);
  const cropRef = useRef<AvatarEditor>(null);

  // handle save
  const handleSave = async () => {
    if (cropRef) {
      const { current } = cropRef;
      if (current) {
        const dataUrl = current.getImage().toDataURL();
        // const result = await fetch(dataUrl);
        // const blob = await result.blob();
        setPreview(dataUrl);
        setModalOpen(false);
      }
    }
  };
  const handleChangeSlider = (e: Event, newValue: number | number[]) => {
    setSlideValue(newValue as number);
  };

  return (
    <Modal sx={modalStyle} open={modalOpen}>
      <Box sx={boxStyle}>
        <AvatarEditor
          ref={cropRef}
          image={src}
          style={{ width: '100%', height: '100%' }}
          border={50}
          borderRadius={150}
          color={[0, 0, 0, 0.72]}
          scale={slideValue / 10}
          rotate={0}
        />

        {/* MUI Slider */}
        <Slider
          min={10}
          max={50}
          sx={{
            margin: '0 auto',
            width: '80%',
            color: 'cyan',
          }}
          size="medium"
          defaultValue={slideValue}
          value={slideValue}
          onChange={handleChangeSlider}
        />
        <Box
          sx={{
            display: 'flex',
            padding: '10px',
            border: '3px solid white',
            background: 'black',
          }}
        >
          <Button
            size="small"
            sx={{ marginRight: '10px', color: 'white', borderColor: 'white' }}
            variant="outlined"
            onClick={(e) => setModalOpen(false)}
          >
            cancel
          </Button>
          <Button
            sx={{ background: '#5596e6' }}
            size="small"
            variant="contained"
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

interface CropperProps {
  preview: string;
  setPreview: (preview: string) => void;
}

// Container
function Cropper({ preview, setPreview }: CropperProps) {
  // image src
  const [src, setSrc] = useState<string>();

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  // ref to control input element
  const inputRef = useRef<HTMLInputElement>(null);

  // handle Click
  const handleInputClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (inputRef.current) inputRef.current.click();
  };
  // handle Change
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setSrc(URL.createObjectURL(e.target.files[0]));
    setModalOpen(true);
  };

  return (
    <CropperContainer>
      <CropperModal
        modalOpen={modalOpen}
        src={src ?? ''}
        setPreview={setPreview}
        setModalOpen={setModalOpen}
      />
      <a href="/" onClick={handleInputClick}>
        <FileUpload className="add-icon" />
      </a>
      <Typography variant="body1">이미지 파일을 업로드 해주세요</Typography>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImgChange}
      />
      <div className="img-container">
        <img
          src={
            preview ||
            ' https://www.signivis.com/img/custom/avatars/member-avatar-01.png'
          }
          alt=""
          width="200"
          height="200"
        />
      </div>
    </CropperContainer>
  );
}

export default Cropper;
