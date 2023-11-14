import chatListAPI from '@/apis/chatListAPI';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function CreateChat() {
  const router = useRouter();

  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [newChatName, setNewChatName] = useState<string>('');

  const createChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    chatListAPI
      .createChat({ name: newChatName, users: [] })
      .then(({ data }) => {
        router.push({
          pathname: `/chat/${data.id}`,
          query: { name: data.name },
        });
      });
  };
  return (
    <>
      <button type="button" onClick={() => setIsShowModal(true)}>
        +
      </button>
      {isShowModal && (
        <form onSubmit={createChat}>
          <input
            type="text"
            name="chat_name"
            onChange={e => setNewChatName(e.target.value)}
            placeholder="채팅방 이름을 입력해 주세요"
          />
          <button type="submit">완료</button>
        </form>
      )}
    </>
  );
}
