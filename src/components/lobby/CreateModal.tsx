import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import pocketRequest from '@/api/pocketRequest';
import fastRequest from '@/api/fastRequest';
import { useAppSelector } from '@/hooks/redux';

import styles from '@styles/components/lobby/lobbyModal.module.scss';

const CreateModal = ({ toggleModal }: Props): JSX.Element => {
  const [inputName, setInputName] = useState('');
  const [limit, setLimit] = useState(4);
  const userId = useAppSelector((state) => state.userId);
  const userInfo = useAppSelector((state) => state.userInfo.user);
  const navigate = useNavigate();

  const createRoom = async () => {
    try {
      const fastResponse = await fastRequest.createChat(
        { name: inputName, users: [userId], isPrivate: false },
        localStorage.getItem('access_token') as string,
      );

      const { name, picture } = userInfo;
      console.log('userinfo', userInfo, userId, name, picture);
      const mafiaIndex = Math.floor(Math.random() * 4);

      const pocketResponse = await pocketRequest.post('game', {
        chatId: fastResponse.id,
        mafia: mafiaIndex,
        vote: [
          {
            id: userId,
            name: name,
            count: 0,
            role: 'citizen',
            picture: picture,
          },
        ],
      });

      navigate(`/chat/${fastResponse.id}`);

      console.log(
        `fastResponse: ${fastResponse.id}`,
        `pocketResponse: ${pocketResponse}`,
      );
    } catch (error) {
      console.error('Creat Room Request Error');
    }
  };

  const handleCreate = async () => {
    await createRoom();
  };

  return (
    <div className={styles.modalBackground}>
      <form className={styles.modal}>
        <h2 className={styles.modal__title}>방 만들기</h2>

        <input
          className={styles.modal__name}
          type="text"
          value={inputName}
          spellCheck="false"
          onChange={({ target: { value } }) => setInputName(value)}
        />

        <label className={styles.modal__limit}>
          플레이어 수
          <select
            className={styles.modal__limit__select}
            typeof="number"
            value={limit}
            onChange={({ target: { value } }) => setLimit(Number(value))}>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </label>

        <button
          className={styles.modal__submit}
          type="button"
          onClick={handleCreate}>
          확 인
        </button>

        <button
          className={styles.modal__exit}
          type="button"
          onClick={toggleModal}>
          X
        </button>
      </form>
    </div>
  );
};

export default CreateModal;

interface Props {
  toggleModal: () => void;
}
