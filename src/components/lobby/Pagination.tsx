import refresh from '@assets/images/refresh.png';
import styles from '@styles/components/lobby/pagination.module.scss';

const Pagenation = ({ total, limit, page, setPage, getAllChat }: Props) => {
  const numPages = Math.ceil(total / limit);
  const handleRefresh = async () => {
    await getAllChat();
    setPage(1);
  };

  return (
    <nav className={styles.pagination}>
      <button
        className={`${styles.pagination__btn} ${styles.arrow}`}
        onClick={() => setPage(page - 1)}
        disabled={page === 1}>
        ◀
      </button>
      <span>{page}</span>
      <button
        className={`${styles.pagination__btn} ${styles.arrow}`}
        onClick={() => setPage(page + 1)}
        disabled={page === numPages}>
        ▶
      </button>
      <button className={styles.pagination__btn}>
        <img src={refresh} alt="새로고침" onClick={handleRefresh} />
      </button>
    </nav>
  );
};

export default Pagenation;

interface Props {
  total: number;
  limit: number;
  page: number;
  setPage: (page: number) => void;
  getAllChat: () => void;
}
