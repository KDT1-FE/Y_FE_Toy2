import Header from '@/components/Common/Header/Header';
import HostList from '../components/HostList/HostList';
import authorizeFetch from '@/utils/authorizeFetch';
import { GetServerSidePropsContext } from 'next';

export default function Home() {
  return (
    <>
      <Header pageName="" />
      <HostList />
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const accessToken = context.req.cookies.ACCESS_TOKEN;
  const refreshToken = context.req.cookies.REFRESH_TOKEN;

  if (!refreshToken) {
    // accessToken이 없으면 로그인 페이지로 리다이렉트
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  if (accessToken && refreshToken) {
    const { data: hostsData } = await authorizeFetch({
      accessToken,
      refreshToken,
    });
    return {
      props: { data: hostsData },
    };
  }
};
