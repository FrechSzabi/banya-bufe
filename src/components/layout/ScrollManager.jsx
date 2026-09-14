import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * A React Router nem görget automatikusan a `/#szekcio` típusú linkeknél,
 * ezt pótolja: hash esetén a szekcióhoz, egyébként az oldal tetejére ugrik.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return undefined;
    }

    // Egy frame késleltetés, hogy útvonalváltás után a cél már renderelve legyen
    const frame = requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({ behavior: 'smooth' });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
