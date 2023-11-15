'use client';
import Navigation from '@/components/Navigation';
import { useRouter } from 'next/navigation';
import { deleteCookie } from '@/lib/cookie';
import { getCookie } from '@/lib/cookie';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isRightWay, setIsRightWay] = useState<boolean>(false);

  useEffect(() => {
    const isUserAccess = getCookie('accessToken');

    if (isUserAccess) {
      setIsRightWay(true);
    } else {
      setIsRightWay(false);
    }
  }, []);

  if (isRightWay) {
    const router = useRouter();

    const onLogout = () => {
      localStorage.clear();
      deleteCookie();
      router.push('/login');
    };

    return (
      <main
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '100px',
        }}
      >
        <br></br>
        <div>
          <p>test01, 12345, 정민</p>
          <p>test02, 12345, 현진</p>
          <p>test03, 12345, 욱진</p>
          <p>test04, 12345, 지오</p>
          <p>test05, 12345, 종수</p>
        </div>

        <a href="/chating/79fa7366-807e-4cdc-9c91-b02331889c89">9조 단톡방</a>
        <Navigation></Navigation>

        <div>
          <button
            onClick={onLogout}
            style={{
              margin: '30px 0',
              border: 'none',
              borderRadius: '5px',
              padding: '10px',
              background: ' #00956e',
              color: '#eee',
            }}
          >
            임시 로그아웃
          </button>
        </div>
        <ul style={{ fontSize: '0.85rem', opacity: '0.75' }}>
          <li style={{ paddingBottom: '0.3rem' }}>
            로그아웃 버튼 클릭 - 로그인 페이지 이동(세션스토리지 : userId, accessToken 삭제 처리)
          </li>
          <li style={{ paddingBottom: '0.3rem' }}>accessToken X - 로그인, 회원가입 페이지만 접근 가능합니다.</li>
          <li>accessToken O - 로그인, 회원가입 페이지접근 불가합니다.</li>
        </ul>
      </main>
    );
  } else {
    return null;
  }
}
