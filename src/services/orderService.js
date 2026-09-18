/**
 * Rendelés leadása a backendnek (server/index.js → POST /api/orders).
 *
 * Csak azonosítókat küldünk (tétel, fajta, köret, szósz, extrák) – a neveket
 * és az árakat a szerver az étlapból számolja újra, és a végösszeget visszaadja.
 */
const toOrderLine = ({ itemId, quantity, options }) => ({
  itemId,
  quantity,
  options: {
    variant: options.variant ?? null,
    isMenu: options.isMenu,
    sideId: options.side?.id ?? null,
    sauceId: options.sauce?.id ?? null,
    addonIds: options.addons.map((addon) => addon.id),
  },
});

export const submitOrder = async ({ customer, lines }) => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customer, lines: lines.map(toOrderLine) }),
  });

  if (!response.ok) throw new Error('A rendelés leadása sikertelen');

  /** { orderNumber, total, estimatedMinutes } */
  return response.json();
};
