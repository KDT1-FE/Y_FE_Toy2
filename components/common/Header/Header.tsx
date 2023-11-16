import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import style from './Header.module.scss';

export default function Header({ pageName }) {
  const [shrink, setShrink] = useState(false);

  if (pageName === 'All') {
    pageName = '오픈채팅방';
  } else if (pageName === 'My') {
    pageName = '나의 채팅방';
  }

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShrink(true);
    } else {
      setShrink(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={style.headerWrapContainer}>
      <div className={`${style.container} ${shrink ? style.shrink : ''}`}>
        <div className={style.logoWrapper}>
          <Image
            src="/images/Talkhaja.svg"
            alt="talkhaja_logo"
            width={shrink ? 120 : 170} // Default size on the 'all' page
            height={shrink ? 42 : 60}
            style={{ transition: 'all 0.3s ease' }}
          />
        </div>
        <span className={style.pageName}>{pageName}</span>
      </div>
    </div>
  );
}
