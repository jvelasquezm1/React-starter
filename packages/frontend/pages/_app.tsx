import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to frontend!</title>
      </Head>
      <main className="app">
        <h1>Hello world!</h1>
        {/* Styled with Tailwind */}
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
