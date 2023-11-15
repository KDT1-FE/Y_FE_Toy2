import '../styles/normalize.scss';
import '../assets/fonts/fonts.scss';
import type { AppProps } from 'next/app';
import { RecoilRoot, RecoilEnv } from 'recoil';
import Navigation from '@/components/Navigation/Navigation';

export default function App({ Component, pageProps }: AppProps) {
  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
  return (
    <RecoilRoot>
      <Navigation />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
