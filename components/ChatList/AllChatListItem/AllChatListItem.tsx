import Image from 'next/image';
import { Chat } from '@/@types/types';
import { useRecoilValue } from 'recoil';
import { userIdState } from '@/recoil/atoms/userIdState';
import chatListAPI from '@/apis/chatListAPI';
import { useRouter } from 'next/router';
import formatTime from '@/utils/timeFormat';
import styles from './AllChatListItem.module.scss';
import JudgeWrapper from './JudgeWrapper/JudgeWrapper';

interface Props {
  chat: Chat;
}

export default function AllChatListItem({ chat }: Props) {
  const userId = useRecoilValue(userIdState);
  const checkIncluded = (element: { id: string }) => {
    if (element.id === userId) {
      return true;
    }
    return false;
  };
  const isincluded = chat.users.some(checkIncluded);

  const router = useRouter();
  const participateChat = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target instanceof HTMLButtonElement) {
      await chatListAPI.participateChat(e.target.id);
      router.push(`/chat/${e.target.id}`);
    }
  };

  const { timeDiffText, className } = formatTime(chat.updatedAt);

  return (
    <li>
      <JudgeWrapper isincluded={isincluded} chatId={chat.id}>
        <Image
          alt={`${chat.users[0].username}의 프로필 사진`}
          src={chat.users[0].picture}
          width={45}
          height={45}
          className={styles['user-profile']}
        />
        <div className={styles['chat-info']}>
          <div className={styles['chat-wrap']}>
            <div className={styles['chat-name-wrap']}>
              <div className={styles['chat-name']}>{chat.name}</div>
              <span className={styles['user-length']}>{chat.users.length}</span>
              <div className={styles.chat_updated}>
                <span className={styles[className]}>{timeDiffText}</span>
              </div>
            </div>
            <div className={styles['chat-lastest-mesaage']}>
              {chat.latestMessage?.text}
            </div>
          </div>
          <div className={styles.right}>
            {!isincluded && (
              <button
                type="button"
                id={chat.id}
                name={chat.name}
                onClick={participateChat}
              >
                참여
              </button>
            )}
          </div>
        </div>
      </JudgeWrapper>
    </li>
  );
}
