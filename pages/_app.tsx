import Navigation from '@/components/common/Navigation/Navigation';
import type { AppContext, AppProps } from 'next/app';
import { MutableSnapshot, RecoilEnv, RecoilRoot } from 'recoil';
import '../assets/fonts/fonts.scss';
import '../styles/normalize.scss';
import { useRouter } from 'next/router';
import userTokenState from '@/recoil/atoms/userTokenState';
import { useEffect } from 'react';
import cookies from 'next-cookies';
import authorizeFetch from '@/utils/authorizeFetch';
import { removeTokenAll } from '@/utils/tokenManager';
import App from 'next/app';
import SIGNOUT_USER_STATE from '@/constants/userLoinState';

function MyApp({
  Component,
  pageProps,
  userData, // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: AppProps | any) {
  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
  const { pathname } = useRouter();
  const initialState = ({ set }: MutableSnapshot) => {
    const { id, name, picture } = userData;
    const isLoggedIn = id !== null;
    set(userTokenState, { id, name, picture, isLoggedIn });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <RecoilRoot initializeState={initialState}>
      <Navigation />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
MyApp.getInitialProps = async (appContext: AppContext): Promise<any> => {
  const appProps = await App.getInitialProps(appContext);
  const { ctx } = appContext;
  const allCookies = cookies(ctx);

  const accessToken = allCookies.ACCESS_TOKEN;
  const refreshToken = allCookies.REFRESH_TOKEN;

  const removeAllCookies = () => {
    // 서버 사이드 쿠키 삭제
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    ctx.res &&
      ctx.res.setHeader('Set-Cookie', [
        `ACCESS_TOKEN=deleted; Max-Age=0`,
        `REFRESH_TOKEN=deleted; Max-Age=0`,
      ]);
    // 클라이언트 사이드 쿠키 삭제
    removeTokenAll();
  };

  let userState = SIGNOUT_USER_STATE;
  if (refreshToken && accessToken) {
    try {
      const { isAuth, data } = await authorizeFetch({
        accessToken,
        refreshToken,
      });

      userState = isAuth ? { ...data, isLoggedIn: true } : SIGNOUT_USER_STATE;

      if (!isAuth) {
        removeAllCookies();
      }
    } catch (e) {
      removeAllCookies();
      userState = SIGNOUT_USER_STATE;
    }
  }

  if (userState.id === null) {
    removeAllCookies();
  }

  return { ...appProps, userData: userState };
};

export default MyApp;
