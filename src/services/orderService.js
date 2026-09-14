import { businessInfo } from '../data/businessInfo';

const SIMULATED_LATENCY_MS = 900;

const generateOrderNumber = () => {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `BB-${new Date().getFullYear().toString().slice(-2)}${random}`;
};

/**
 * MOCK rendelés-leadás – frontend-only.
 *
 * TODO: a valódi rendelés-továbbítást egy külön backend szolgáltatással
 * kell összekötni (pl. REST API végpont, amely e-mailt / SMS-t küld a
 * büfének, vagy egy rendeléskezelő rendszerbe írja a rendelést).
 * Példa:
 *   const response = await fetch('/api/orders', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(order),
 *   });
 *   if (!response.ok) throw new Error('A rendelés leadása sikertelen');
 *   return response.json();
 */
export const submitOrder = async (order) => {
  console.log('[Bánya Büfé] Új rendelés (mock):', order);

  await new Promise((resolve) => setTimeout(resolve, SIMULATED_LATENCY_MS));

  return {
    orderNumber: generateOrderNumber(),
    estimatedMinutes: businessInfo.delivery.estimatedMinutes,
  };
};
