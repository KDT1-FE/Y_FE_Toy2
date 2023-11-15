import styles from '@styles/components/ghostItem.module.scss';
import { Ghost } from '@/pages/game/Vote';

const GhostItem = ({ ghost, isSelected, handleIsSelected }: GhostProps) => {
  const handleClick = () => {
    handleIsSelected(ghost.id);
  };

  return (
    <li onClick={handleClick} className={styles.ghost}>
      <div className={styles.ghost__image}>
        <div
          className={
            isSelected
              ? `${styles.checked} ${styles.active}`
              : `${styles.checked}`
          }></div>
        <img src={ghost.picture} alt={`${ghost.name}님의 프로필`} />
      </div>
      <div className={styles.ghost__name}>{ghost.name}</div>
    </li>
  );
};

export default GhostItem;

type GhostProps = {
  ghost: Ghost;
  isSelected: boolean;
  handleIsSelected: (id: string) => void;
};
