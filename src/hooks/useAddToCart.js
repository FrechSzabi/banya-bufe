import { useEffect, useState } from 'react';
import { needsConfiguration } from '../data/menuData';
import { useCart } from './useCart';

const FEEDBACK_DURATION_MS = 1400;
const DEFAULT_OPTIONS = { variant: null, isMenu: false, side: null, sauce: null, addons: [] };

/**
 * "Kosárba" gomb logika: egyszerű tételnél azonnal kosárba teszi,
 * testreszabható tételnél megnyitja a beállító ablakot.
 */
export function useAddToCart(item) {
  const { addItem } = useCart();
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!justAdded) return undefined;
    const timer = setTimeout(() => setJustAdded(false), FEEDBACK_DURATION_MS);
    return () => clearTimeout(timer);
  }, [justAdded]);

  const requestAdd = () => {
    if (needsConfiguration(item)) {
      setIsConfiguring(true);
      return;
    }
    addItem(item, DEFAULT_OPTIONS);
    setJustAdded(true);
  };

  const confirmConfiguredAdd = (options, quantity) => {
    addItem(item, options, quantity);
    setIsConfiguring(false);
    setJustAdded(true);
  };

  return {
    requestAdd,
    confirmConfiguredAdd,
    isConfiguring,
    cancelConfiguring: () => setIsConfiguring(false),
    justAdded,
  };
}
