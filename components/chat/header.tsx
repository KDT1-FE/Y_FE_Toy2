import { useState } from 'react';
import instance from '@/apis/axios';
import { useRouter } from 'next/router';
import { HiArrowLongLeft } from 'react-icons/hi2';
import MenuIcon from './MenuIcon';
import styles from './Chat.module.scss';

interface Props {
  chatId: string;
}

export default function ChatroomHeader({ chatId }: Props) {
  const router = useRouter();

  const [isMenuOpen, setMenuOpen] = useState(false);
  const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNiN2ZiMTExZTp1c2VyNSIsImlhdCI6MTY5OTU5OTI3NywiZXhwIjoxNzAwMjA0MDc3fQ.xQ34bIb3kC-ISYgYtCQypNN6A5T7A3TJh_TX31hXVZI';

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  // const closeMenu = () => {
  //   setMenuOpen(false);
  // };

  const handleBackBtnClick = () => {
    router.back();
  };

  const handleOutBtnClick = async () => {
    try {
      const response = await instance.patch(
        '/chat/leave',
        {
          chatId, // API에 chatId 전달
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(response);
      router.push('.');
      // 채팅방 나가기 성공 후 추가적인 로직이 필요할 수 있습니다.
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <HiArrowLongLeft onClick={handleBackBtnClick} />
      </div>
      <h3 className={styles.chatTitle}>채팅방 이름</h3>
      <button type="button" className={styles.right} onClick={toggleMenu}>
        <MenuIcon />
        {/* Dropdown 메뉴 */}
        {isMenuOpen && (
          <div className={styles.dropdownMenu}>
            <ul>
              <div>
                <p>OO 오픈 채팅방</p>
                <h6>OO명</h6>
              </div>
              <div>
                <li>참여자 1</li>
                <li>참여자 2</li>
              </div>
            </ul>
            <button
              type="submit"
              className={styles.exitButton}
              onClick={handleOutBtnClick}
            >
              채팅방 나가기
            </button>
          </div>
        )}
      </button>
    </div>
  );
}
