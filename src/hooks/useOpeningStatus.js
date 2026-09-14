import { useEffect, useState } from 'react';
import { getOpeningStatus } from '../utils/openingHours';

const REFRESH_INTERVAL_MS = 60_000;

/** Élő nyitva/zárva állapot, percenként frissítve. */
export function useOpeningStatus() {
  const [status, setStatus] = useState(() => getOpeningStatus());

  useEffect(() => {
    const timer = setInterval(() => setStatus(getOpeningStatus()), REFRESH_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  return status;
}
