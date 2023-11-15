import { RecoilRoot } from 'recoil';
import type { AppProps } from 'next/app';
import Navigation from '@/components/Navigation/Navigation';
import '../styles/normalize.scss';
import '../assets/fonts/fonts.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Navigation />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
