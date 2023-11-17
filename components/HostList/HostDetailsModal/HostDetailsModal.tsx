import { useRef } from 'react';
import { BsXCircle } from 'react-icons/bs';
import Button from '@/components/HostList/HostListItem/Button/Button';
import useOnClickOutside from '@/hooks/useOnClickOustside';
import chatListAPI from '@/apis/chatListAPI';
import { useRouter } from 'next/router';
import { Chat } from '@/@types/types';
import { Host } from '@/components/HostList/HostList1.types';
import styles from './HostDetailsModal.module.scss';
import { Modal } from '../../Common';

interface HostDetailsModalProps {
  onClose: () => void;
  hostDetails: Host;
}

export default function HostDetailsModal({
  onClose,
  hostDetails,
}: HostDetailsModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    onClose();
  });

  const router = useRouter();
  const createHostChat = async () => {
    // 내가 참여 중인 채팅 목록
    const chatMyList = await chatListAPI.getMyChatList();
    // 숙소와의 채팅만 필터링
    const hostChatList = chatMyList.data.chats.filter(
      (chat: Chat) => chat.isPrivate,
    );

    let chatId = '';
    // 숙소와의 채팅 존재 여부
    const isExist = hostChatList.some((chat: Chat) => {
      if (chat.users.some(user => user.id === hostDetails.id)) {
        chatId = chat.id;
        return true;
      }
      return false;
    });

    // 숙소와 채팅방이 존재하지 않으면 채팅방 생성
    if (!isExist) {
      chatListAPI
        .createChat({
          name: hostDetails.name,
          users: [hostDetails.id],
          isPrivate: true,
        })
        .then(res => {
          router.push(`/chat/${res.data.id}`);
        });
    } else {
      // 숙소와 채팅방이 존재하면 채팅방으로 이동
      router.push(`/chat/${chatId}`);
    }
  };

  return (
    <>
      <div className={styles.dim} />
      <Modal>
        <div id={styles.ModalBox} ref={ref}>
          <BsXCircle className={styles['close-icon']} onClick={onClose} />
          <div
            className={styles['img-box']}
            style={{
              backgroundImage: `url(${hostDetails.picture})`,
            }}
          />
          <div className={styles['flex-row']}>
            <h4 className={styles.title}>{hostDetails.name}</h4>
            <Button
              className="fill-btn"
              text="문의하기"
              onClick={createHostChat}
            />
          </div>
          <p className={styles.text}>
            <b>주소 :</b> {hostDetails.location} {hostDetails.address}
          </p>

          <p className={styles.text}>
            <b>숙소 소개</b>
            <br />
            {hostDetails.description}
          </p>
          <p className={styles.text}>
            <b>시설 및 서비스</b> <br /> {hostDetails.service}
          </p>
        </div>
      </Modal>
    </>
  );
}
