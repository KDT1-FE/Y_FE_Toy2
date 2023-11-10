import { useState } from 'react';
import LeftArrowIcon from './LeftArrowIcon';
import MenuIcon from './MenuIcon';
import styles from './Chat.module.scss';

export default function ChatroomHeader() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <LeftArrowIcon />
        {/* 채팅방 닫기 기능 */}
      </div>
      <h3 className={styles.chatTitle}>채팅방 이름</h3>
      <div className={styles.right} onClick={toggleMenu}>
        <MenuIcon />
        {/* Dropdown 메뉴 */}
        {isMenuOpen && (
          <div className={styles.dropdownMenu}>
            <ul>
              <div>
                <p>OO 오픈 채팅방</p>
                <h6>OO명</h6>
              </div>
              <div>
                <li>참여자 1</li>
                <li>참여자 2</li>
              </div>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
