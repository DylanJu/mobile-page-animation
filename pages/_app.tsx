import Head from 'next/head';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import '../styles/globals.css';
import TransitionLayout from '../components/TransitionLayout';
import MemoLayer from '../components/MemoLayer';

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
