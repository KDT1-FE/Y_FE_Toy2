import { useState } from 'react';
import { useRouter } from 'next/router';
import { HiArrowLongLeft } from 'react-icons/hi2';
import { IoMdMenu } from 'react-icons/io';
import { Chat } from '@/@types/types';
import Image from 'next/image';
import styles from './Chat.module.scss';
import Jwtinterceptors from '../../apis/Jwtinterceptors';

interface Props {
  chatData: Chat;
}

export default function ChatroomHeader({ chatData }: Props) {
  const router = useRouter();

  const { instance } = Jwtinterceptors();

  const accessToken = localStorage.getItem('accessToken');

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleBackBtnClick = () => {
    router.back();
  };

  const handleOutBtnClick = async () => {
    try {
      await instance.patch(
        '/chat/leave',
        {
          chatId: chatData.id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      router.push('/chat-list/my');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <HiArrowLongLeft onClick={handleBackBtnClick} />
      </div>
      {chatData && (
        <>
          <h3 className={styles.chatTitle}>{chatData.name}</h3>
          <button type="button" className={styles.right} onClick={toggleMenu}>
            <IoMdMenu />
            {menuOpen && (
              <div className={styles.dropdownMenu}>
                <ul>
                  <div className={styles.counter}>
                    <p>현재 채팅인원 수</p>
                    <h6>{chatData.users.length}명</h6>
                  </div>
                  <div className={styles.userDiv}>
                    {chatData.users.map(user => (
                      <li key={user.id}>
                        <Image
                          width={35}
                          height={35}
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
          </button>
        </>
      )}
    </div>
  );
}
