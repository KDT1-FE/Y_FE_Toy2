import React, { useRef, useState } from 'react';
import useOnClickOutside from '@/hooks/useOnClickOustside';
import { BsXCircle } from 'react-icons/bs';
import { useRouter } from 'next/router';
import chatListAPI from '@/apis/chatListAPI';
import Modal from '../common/Modal';
import style from './ChatListModal.module.scss';

interface ChatListModalProps {
    handleModal : () => void;
}

export default function ChatListModal({
    handleModal,
} : ChatListModalProps) {
    const router = useRouter();

    const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    handleModal();
  });

    const [newChatName, setNewChatName] = useState<string>('');
  
    const createChat = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if(newChatName.length > 10) {
        alert('10글자 이내로 이름을 작성해주세요!');
        setNewChatName('');
        return;
        
      }
      chatListAPI.createChat({ name: newChatName, users: [] }).then(res => {
        router.push(`/chat/${res.data.id}`);
        handleModal();
      });
    };


  return (
    <div className={style.dim}>
        <Modal>
        <div className={style.ChatListModalBox}>
        <BsXCircle  className={style['close-icon']} onClick={handleModal}/>
        <p> 채팅방 이름 </p>
        <form onSubmit={createChat}>
          <input
            type="text"
            name="chat_name"
            value={newChatName}
            onChange={e => setNewChatName(e.target.value)}
            placeholder="10글자 이내에 작성해주세요."
          />
          <button type="submit">완료</button>
        </form>

        </div>
     
      
    </Modal>

    </div>
    
  );
}

