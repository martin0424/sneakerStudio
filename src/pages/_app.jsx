import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Nav from "../components/nav";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Nav/>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
