import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { HiArrowLongLeft } from 'react-icons/hi2';
import { IoMdMenu } from 'react-icons/io';
import { Chat, ChatUser } from '@/@types/types';
import chatAPI from '@/apis/chatAPI';
import styles from './Chat.module.scss';
import Jwtinterceptors from '../../apis/Jwtinterceptors';

interface Props {
  chatId: string;
}

export default function ChatroomHeader({ chatId }: Props) {
  const router = useRouter();

  const { instance } = Jwtinterceptors();
  const [chatData, setChatData] = useState<Chat | null>();

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
      router.push('/chat-list/my');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        if (chatId && typeof chatId === 'string') {
          const response = await chatAPI.getChatInfo(chatId);
          const chatInfo: Chat = response.data.chat;
          setChatData(chatInfo);
        }
      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    };

    if (chatId) {
      fetchChatData();
    }
  }, [chatId]);

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <HiArrowLongLeft onClick={handleBackBtnClick} />
      </div>
      {chatData && (
        <>
          <h3 className={styles.chatTitle}>{chatData.name}</h3>
          <div className={styles.right} onClick={toggleMenu}>
            <IoMdMenu />
            {/* Dropdown 메뉴 */}
            {isMenuOpen && (
              <div className={styles.dropdownMenu}>
                <ul>
                  <div>
                    <p>현재 채팅인원 수</p>
                    <h6>{chatData.users.length}명</h6>
                  </div>
                  <div className={styles.userDiv}>
                    {chatData.users.map(user => (
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
        </>
      )}
    </div>
  );
}
