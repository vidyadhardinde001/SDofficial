// pages/_app.tsx
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.css'; // Assuming you have a global stylesheet

function MyApp({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    // Scroll to top on page change
    const handleRouteChange = () => window.scrollTo(0, 0);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  );
}

export default MyApp;
