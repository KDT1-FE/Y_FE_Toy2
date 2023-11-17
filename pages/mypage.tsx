import app from '@/utils/firebaseConfig';
import { removeTokenAll } from '@/utils/tokenManager';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import Jwtinterceptor from '@/apis/JwtInterceptor';
import SIGNOUT_USER_STATE from '@/constants/userLoinState';
import userTokenState from '@/recoil/atoms/userTokenState';
import authorizeFetch from '@/utils/authorizeFetch';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from 'firebase/storage';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import styles from '@/components/MyPage.module.scss';

interface PatchResponseValue {
  messgae: string;
}

const { instance } = Jwtinterceptor();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MyPage({ userData }: any) {
  const router = useRouter();
  const imageRef = useRef<HTMLInputElement>(null);
  const imageStyle = {
    borderRadius: '50%',
  };
  const DEFAULT_IMAGE_URL =
    'https://firebasestorage.googleapis.com/v0/b/talk-eaae8.appspot.com/o/images%2Fdefault.jpg?alt=media&token=6ca482c2-bcb0-48cc-b673-76ad2b4ce943';
  const { id, name, picture } = userData.user;
  const [pictureName, setPictureName] = useState('default.jpg');
  const [selectedImg, setSelectedImg] = useState<string>(picture);
  const [userName, setUserName] = useState(name);
  const setUser = useSetRecoilState(userTokenState);
  const handleInputClick = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
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

  const imageUpload = async (): Promise<string | undefined> => {
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

  const handleImageSaveClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    try {
      const selectedImgUrl: string | undefined = await imageUpload();
      if (selectedImgUrl) {
        await instance.patch<PatchResponseValue>('/user', {
          picture: selectedImgUrl,
        });
        alert('사진이 변경되었습니다.');
        setSelectedImg(selectedImgUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageDeleteClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    try {
      if (picture !== DEFAULT_IMAGE_URL) {
        await instance.patch<PatchResponseValue>('/user', {
          picture: DEFAULT_IMAGE_URL,
        });
        alert('기본이미지로 변경되었습니다.');
        setSelectedImg(DEFAULT_IMAGE_URL);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePatchUserNameClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    try {
      const requestUserName = userName.trim();
      if (name !== requestUserName) {
        await instance.patch('/user', { name: requestUserName });
        alert('이름이 수정되었습니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogoutClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (window.confirm('로그아웃 하시겠습니까?')) {
      setUser(SIGNOUT_USER_STATE);
      removeTokenAll();
      router.push('/login');
    }
  };

  return (
    <div className={styles.myPageWrapper}>
      <div className={styles.myPageBox}>
        <Image
          src="/images/Talkhaja.svg"
          alt="talkhaja_logo"
          width={250}
          height={100}
        />
        <h2 className={styles.myPageTitle}>마이페이지</h2>
        <form className={styles.myPageForm}>
          <div className={styles.userImgContainer}>
            <div className={styles.imgBox}>
              {picture && selectedImg && (
                <Image
                  src={selectedImg}
                  alt="프로필 사진"
                  width={150}
                  height={150}
                  style={imageStyle}
                  priority
                />
              )}
            </div>
            <div className={styles.imageButtonContainer}>
              <button type="button" onClick={handleInputClick}>
                사진변경
              </button>
              <input
                type="file"
                accept="image/*"
                className={styles.imageInputButton}
                ref={imageRef}
                onChange={handleFileChange}
              />
              <button
                type="button"
                className={styles.deleteImageButton}
                onClick={handleImageDeleteClick}
              >
                사진삭제
              </button>
              <button
                type="button"
                className={styles.updateImageButton}
                onClick={handleImageSaveClick}
              >
                저장
              </button>
            </div>
          </div>
          <div>
            <div className={styles.idNameBox}>
              <div className={styles.idName}>아이디</div>
              <span>{id}</span>
            </div>
            <div className={styles.idNameBox}>
              <div className={styles.idName}>이름</div>
              <input
                value={userName}
                type="text"
                onChange={e => setUserName(e.target.value)}
              />
              <button type="button" onClick={handlePatchUserNameClick}>
                수정
              </button>
            </div>
          </div>
        </form>
        <button
          type="button"
          className={styles.logoutButton}
          onClick={handleLogoutClick}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const accessToken = context.req.cookies.ACCESS_TOKEN;
  const refreshToken = context.req.cookies.REFRESH_TOKEN;

  if (accessToken && refreshToken) {
    const response = await authorizeFetch({
      accessToken,
      refreshToken,
    });
    return {
      props: { userData: response.data },
    };
  }
  if (!refreshToken) {
    // accessToken이 없으면 로그인 페이지로 리다이렉트
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
