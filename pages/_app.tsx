import Head from 'next/head';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import '../styles/globals.css';
import MemoLayer from '../components/MemoLayer';

if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  const VConsole = require('vconsole');
  const vConsole = new VConsole();
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <RecoilRoot>
        <MemoLayer>
          <Component {...pageProps} />
        </MemoLayer>
      </RecoilRoot>
    </>
  );
};

export default MyApp;
