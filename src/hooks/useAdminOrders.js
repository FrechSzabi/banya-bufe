import { useCallback, useEffect, useRef, useState } from 'react';
import { ORDER_VIEWS } from '../data/orderStatuses';
import { adminApi } from '../services/adminApi';

const POLL_INTERVAL_MS = 15_000;

/**
 * Rendelések listája az admin felülethez, 15 mp-es automatikus frissítéssel.
 * `onNewOrders` akkor fut, ha az aktív nézetben korábban nem látott rendelés jelenik meg.
 */
export function useAdminOrders({ view, onError, onNewOrders }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [pendingIds, setPendingIds] = useState(() => new Set());
  const seenIdsRef = useRef(null);

  // A callbackek változása ne indítsa újra a lekérdezést
  const callbacksRef = useRef({ onError, onNewOrders });
  callbacksRef.current = { onError, onNewOrders };

  const refresh = useCallback(async () => {
    try {
      const nextOrders = await adminApi.fetchOrders(view);
      setOrders(nextOrders);
      setError(null);
      setLastUpdated(new Date());

      if (view === 'active') {
        const seen = seenIdsRef.current;
        const fresh = seen ? nextOrders.filter((order) => !seen.has(order.id)) : [];
        seenIdsRef.current = new Set([...(seen ?? []), ...nextOrders.map((order) => order.id)]);
        if (fresh.length > 0) callbacksRef.current.onNewOrders?.(fresh);
      }
    } catch (fetchError) {
      setError(fetchError.message);
      callbacksRef.current.onError?.(fetchError);
    } finally {
      setIsLoading(false);
    }
  }, [view]);

  useEffect(() => {
    setIsLoading(true);
    refresh();
    const timer = setInterval(refresh, POLL_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [refresh]);

  const updateStatus = useCallback(
    async (orderId, status) => {
      setPendingIds((current) => new Set(current).add(orderId));
      try {
        const updated = await adminApi.updateStatus(orderId, status);
        const belongsHere = ORDER_VIEWS[view].includes(status);
        setOrders((current) =>
          belongsHere
            ? current.map((order) => (order.id === orderId ? updated : order))
            : current.filter((order) => order.id !== orderId),
        );
        setError(null);
      } catch (updateError) {
        setError(updateError.message);
        callbacksRef.current.onError?.(updateError);
      } finally {
        setPendingIds((current) => {
          const next = new Set(current);
          next.delete(orderId);
          return next;
        });
      }
    },
    [view],
  );

  return { orders, isLoading, error, lastUpdated, pendingIds, refresh, updateStatus };
}
