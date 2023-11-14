import instance from '@/apis/axios';
import app from '@/utils/firebaseConfig';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from 'firebase/storage';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { BsCameraFill, BsFillTrash3Fill } from 'react-icons/bs';
import Modal from '../common/Modal';
import styles from './SignUpModal.module.scss';

interface RequestBody {
  id: string;
  password: string;
  name: string;
}

interface UserRequestBody extends RequestBody {
  picture: string;
}

interface SignUpModalProps {
  handleModal: () => void;
  formData: RequestBody;
  defaultImgUrl: string | null;
}

export default function SignUpModal({
  handleModal,
  formData,
  defaultImgUrl,
}: SignUpModalProps) {
  const router = useRouter();
  const userFormData: RequestBody = formData;
  const [pictureName, setPictureName] = useState('default.jpg');
  const [selectedImg, setSelectedImg] = useState<string | null>(defaultImgUrl);
  const imageRef = useRef<HTMLInputElement>(null);
  const imageStyle = {
    borderRadius: '50%',
  };

  console.log(defaultImgUrl);
  const handleInputClick = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleImgResetClick = () => {
    setSelectedImg(defaultImgUrl);
    setPictureName('default.jpg');
  };

  const previewImg = (img: File | undefined) => {
    if (img) {
      setPictureName(img?.name);

      const fileReader = new FileReader();
      fileReader.onload = event => {
        if (event.target) {
          setSelectedImg(event.target.result as string);
        }
      };
      fileReader.readAsDataURL(img);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile: File | undefined = e.target.files?.[0];
    previewImg(selectedFile);
  };

  const handleImageUpload = async (): Promise<string | undefined> => {
    try {
      if (selectedImg) {
        const storage = getStorage(app);
        const imagesRef = ref(storage, `images/${pictureName}`);

        if (selectedImg !== defaultImgUrl) {
          await uploadString(imagesRef, selectedImg, 'data_url');
          const url = await getDownloadURL(imagesRef);
          return url;
        }
        return defaultImgUrl;
      }
    } catch (error) {
      console.log(error);
    }
    return undefined;
  };

  const handleSignUpClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const selectedImgUrl: string | undefined = await handleImageUpload();
      if (selectedImgUrl) {
        const requestUserData: UserRequestBody = {
          ...userFormData,
          picture: selectedImgUrl,
        };
        await instance.post('/signup', requestUserData);
        alert('회원가입이 완료되었습니다.');
        handleModal();
        router.push('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal>
      <div className={styles.signUpModalBox}>
        <h2>프로필 사진 설정</h2>
        <div className={styles.userImgBox}>
          {selectedImg ? (
            <Image
              src={selectedImg}
              alt="이미지 미리보기"
              width={160}
              height={160}
              style={imageStyle}
            />
          ) : (
            ''
          )}
          <BsCameraFill
            className={styles.camaraIcon}
            onClick={handleInputClick}
          />

          <BsFillTrash3Fill
            className={styles.resetIcon}
            onClick={handleImgResetClick}
          />
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={imageRef}
          />
        </div>
        <div className={styles.actionButtonsWrapper}>
          <button type="button" onClick={handleSignUpClick}>
            가입하기
          </button>
          <button type="button" onClick={handleModal}>
            뒤로가기
          </button>
        </div>
      </div>
    </Modal>
  );
}
