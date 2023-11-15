import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import style from './Header.module.scss';

export default function Header() {
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
    <div className={`${style.container} ${shrink ? style.shrink : ''}`}>
      <Image
        src="/images/Talkhaja.svg"
        alt="talkhaja_logo"
        width={shrink ? 120 : 170} // 축소될 때의 크기
        height={shrink ? 42 : 60} // 축소될 때의 크기
        style={{ transition: 'all 0.3s ease' }}
      />
    </div>
  );
}
