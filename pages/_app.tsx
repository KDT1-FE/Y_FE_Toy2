import Navigation from '@/components/Navigation/Navigation';
import type { AppProps } from 'next/app';
import { RecoilEnv, RecoilRoot } from 'recoil';
import '../assets/fonts/fonts.scss';
import '../styles/normalize.scss';

export default function App({ Component, pageProps }: AppProps) {
  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

  return (
    <RecoilRoot>
      <Navigation />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
