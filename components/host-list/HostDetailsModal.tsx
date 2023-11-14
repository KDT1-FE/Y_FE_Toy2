import React, { useRef } from 'react';

import { BsXCircle } from 'react-icons/bs';
import Button from '@/components/host-list/Button';
import Modal from '@/components/common/Modal';
import useOnClickOutside from '@/hooks/useOnClickOustside';
import { Host } from '@/pages/host-list/hostList.types';
import chatListAPI from '@/apis/chatListAPI';
import { useRouter } from 'next/router';
import { Chat } from '@/@types/types';
import styles from './HostDetailsModal.module.scss';

interface HostDetailsModalProps {
  onClose: () => void;
  hostDetails: Host;
  isModalOpen: boolean;
}

export default function HostDetailsModal({
  onClose,
  hostDetails,
  isModalOpen,
}: HostDetailsModalProps) {
  // const ref = useRef<HTMLDivElement>(null);
  // useOnClickOutside(ref, () => {
  //   onClose();
  // });

  const router = useRouter();
  const createHostChat = async () => {
    // 내가 참여 중인 채팅 목록
    const chatMyList = await chatListAPI.getMyChatList();
    // 숙소와의 채팅만 필터링
    const hostChatList = chatMyList.data.chats.filter(
      (chat: Chat) => chat.isPrivate,
    );

    let chatId = '';
    let chatName = '';
    // 숙소와의 채팅 존재 여부
    const isExist = hostChatList.some((chat: Chat) => {
      if (chat.users.some(user => user.id === hostDetails.id)) {
        chatId = chat.id;
        chatName = chat.name;
        return true;
      }
      return false;
    });
    if (!isExist) {
      chatListAPI
        .createChat({
          name: hostDetails.name,
          users: [hostDetails.id],
          isPrivate: true,
        })
        .then(res => {
          router.push({
            pathname: `/chat/${res.data.id}`,
            query: { name: res.data.name },
          });
        });
    } else {
      router.push({
        pathname: `/chat/${chatId}`,
        query: { name: chatName },
      });
    }
  };
  return (
    <>
      <div className={styles.dim} />
      <Modal onClose={onClose}>
        <div
          className={`${styles.ModalBox} ${isModalOpen ? 'open' : ''}`}
          ref={ref}
        >
          <BsXCircle className={styles['close-icon']} onClick={onClose} />

          <img
            className={styles['host-img']}
            src={hostDetails.picture}
            alt={hostDetails.name}
          />
          <p className={styles['flex-row']}>
            <h4 className={styles.title}>{hostDetails.name}</h4>
            <Button
              className="fill-btn"
              text="문의하기"
              onClick={createHostChat}
            />
          </p>
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
