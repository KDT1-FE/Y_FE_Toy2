// import styles from '@/styles/Home.module.scss';

import Header from '@/components/Header/Header';
import { GetServerSideProps } from 'next';
import HostList from './host-list';

export default function Home() {
  return (
    <>
      <Header />
      <HostList />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const cookies = context.req.headers.cookie || ''; // 쿠키 문자열을 가져옴
  const accessTokenCookie = cookies
    .split(';')
    .find(cookie => cookie.trim().startsWith('accessToken='));

  if (!accessTokenCookie) {
    // accessToken이 없으면 로그인 페이지로 리다이렉트
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // accessToken이 있다면 홈 페이지로 이동
  return {
    props: {},
  };
};
