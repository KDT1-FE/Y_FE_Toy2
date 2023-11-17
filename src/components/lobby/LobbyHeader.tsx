import { useAppSelector } from '@/hooks/redux';

import styles from '@styles/components/lobby/lobbyHeader.module.scss';

const LobbyHeader = ({ toggleModal }: Props): JSX.Element => {
  const userInfo = useAppSelector((state) => state.userInfo.user);
  console.log('header', userInfo);

  return (
    <header className={styles.header}>
      <h1>Mafia</h1>
      <div className={styles.header__right}>
        <button className={styles.header__right__btn} onClick={toggleModal}>
          방 만들기
        </button>

        <div className={styles.header__right__userImg}>
          <img src={userInfo.picture} alt="유저 프로필" />
        </div>
      </div>
    </header>
  );
};

export default LobbyHeader;

interface Props {
  toggleModal: () => void;
}
