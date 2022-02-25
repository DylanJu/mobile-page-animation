import Head from 'next/head';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import AnimationLayer from '../components/AnimationLayer';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <AnimationLayer>
        <Component {...pageProps} />
      </AnimationLayer>
    </>
  );
};

export default MyApp;
