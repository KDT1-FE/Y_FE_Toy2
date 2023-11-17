import React from 'react';
import Link from 'next/link';
import {
  BsHouses,
  BsPersonCircle,
  BsChatSquareHeart,
  BsChatSquareQuote,
} from 'react-icons/bs';
import { useRecoilValue } from 'recoil';
import { showNavigationState } from '@/stores/atoms/nav.atoms';
import styles from './Navigation.module.scss';

function Navigation() {
  const showNavigation = useRecoilValue(showNavigationState);

  return (
    <div>
      {showNavigation && (
        <nav className={styles.nav}>
          <ul className={styles.inner}>
            <li className={styles.menu}>
              <Link href="/">
                <BsHouses className={styles.icon} />
                <p>숙소목록</p>
              </Link>
            </li>
            <li className={styles.menu}>
              <Link href="/chat-list/all">
                <BsChatSquareQuote className={styles.icon} />
                <p>오픈채팅</p>
              </Link>
            </li>
            <li className={styles.menu}>
              <Link href="/chat-list/my">
                <BsChatSquareHeart className={styles.icon} />
                <p>나의 채팅목록</p>
              </Link>
            </li>
            <li className={styles.menu}>
              <Link href="/mypage">
                <BsPersonCircle className={styles.icon} />
                <p>마이페이지</p>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default Navigation;
