import styles from './Chat.module.scss';

export default function chatroomHeader() {
  return (
    <div className={styles.footer}>
      <textarea
        className={styles.chatInput}
        placeholder="대화를 시작해보세요!"
      />
      <button className={styles.triangle_button} />
    </div>
  );
}
