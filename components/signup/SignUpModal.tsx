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
import styles from './SignUpModal.module.scss';
import Loading from './Loading';
import Modal from '../common/Modal';

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
}

export default function SignUpModal({
  handleModal,
  formData,
}: SignUpModalProps) {
  const router = useRouter();
  const userFormData: RequestBody = formData;
  const [pictureName, setPictureName] = useState('default.jpg');
  const DEFAULT_IMAGE_URL =
    'https://firebasestorage.googleapis.com/v0/b/talk-eaae8.appspot.com/o/images%2Fdefault.jpg?alt=media&token=6ca482c2-bcb0-48cc-b673-76ad2b4ce943';
  const [selectedImg, setSelectedImg] = useState(DEFAULT_IMAGE_URL);
  const imageRef = useRef<HTMLInputElement>(null);
  const imageStyle = {
    borderRadius: '50%',
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleInputClick = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const handleImgResetClick = () => {
    setSelectedImg(DEFAULT_IMAGE_URL);
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

        await uploadString(imagesRef, selectedImg, 'data_url');
        const url = await getDownloadURL(imagesRef);
        return url;
      }
    } catch (error) {
      console.log(error);
    }
    return undefined;
  };

  const handleSignUpClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true); // 로딩 시작
    console.log(isLoading);
    try {
      const selectedImgUrl: string | undefined = await handleImageUpload();
      if (selectedImgUrl) {
        const requestUserData: UserRequestBody = {
          ...userFormData,
          picture: selectedImgUrl,
        };
        await instance.post('/signup', requestUserData);
      } else {
        const requestUserData: UserRequestBody = {
          ...userFormData,
          picture: DEFAULT_IMAGE_URL,
        };
        await instance.post('/signup', requestUserData);
      }
      router.push('/login');
    } catch (error) {
      console.log(error);
      // 에러 처리 알림
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  return (
    <div className={styles.dim}>
      {isLoading ? (
        <Loading />
      ) : (
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
      )}
    </div>
  );
}
