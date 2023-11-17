import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import style from './Header.module.scss';

interface Props {
  pageName: string;
}

export default function Header({ pageName }: Props) {
  const [shrink, setShrink] = useState(false);

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
