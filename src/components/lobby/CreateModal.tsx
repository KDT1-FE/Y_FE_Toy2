import { useState } from 'react';

import styles from '@styles/components/lobby/lobbyModal.module.scss';

const CreateModal = ({ toggleModal }: Props): JSX.Element => {
  const [inputName, setInputName] = useState('');
  const [limit, setLimit] = useState(4);

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

        <button className={styles.modal__submit} type="submit">
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
