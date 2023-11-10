import '../styles/normalize.scss';
import '../assets/fonts/fonts.scss';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import Navigation from '@/components/Navigation/Navigation';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Navigation />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
