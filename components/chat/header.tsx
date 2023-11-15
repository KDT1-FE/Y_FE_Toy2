import { useState } from 'react';
import { useRouter } from 'next/router';
import { HiArrowLongLeft } from 'react-icons/hi2';
import { IoMdMenu } from 'react-icons/io';
import { ChatUser } from '@/@types/types';
import styles from './Chat.module.scss';
import Jwtinterceptors from '../../apis/Jwtinterceptors';

interface Props {
  chatId: string;
  name: string;
  users: ChatUser[];
}

export default function ChatroomHeader({ chatId, name, users }: Props) {
  const router = useRouter();

  const { instance } = Jwtinterceptors();

  const accessToken: string = localStorage.getItem('accessToken');

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

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
      router.push('/chat-list/my');
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
      <h3 className={styles.chatTitle}>{name}</h3>
      <div className={styles.right} onClick={toggleMenu}>
        <IoMdMenu />
        {/* Dropdown 메뉴 */}
        {isMenuOpen && (
          <div className={styles.dropdownMenu}>
            <ul>
              <div>
                <p>현재 채팅인원 수</p>
                <h6>{users.length}명</h6>
              </div>
              <div className={styles.userDiv}>
                {users.map(user => (
                  <li key={user.id}>
                    <img
                      src={user.picture}
                      className={styles.profileImage}
                      alt="User"
                    />
                    <span className={styles.username}>{user.username}</span>
                  </li>
                ))}
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
      </div>
    </div>
  );
}
