import { formatPrice } from './formatPrice.js';

/**
 * Egy kosársor ("line") egy étel adott konfigurációval, pl.
 * "Bánya burger, menüben, édesburgonyával, BBQ szósszal, + bacon".
 *
 * options: { variant, isMenu, side, sauce, addons[] }
 */

export const calculateUnitPrice = (item, { isMenu, side, addons }) => {
  const basePrice = isMenu ? item.menuPrice : item.price;
  const sideSurcharge = isMenu && side ? side.surcharge : 0;
  const addonsTotal = addons.reduce((sum, addon) => sum + addon.price, 0);
  return basePrice + sideSurcharge + addonsTotal;
};

/** Azonos étel + azonos beállítások → azonos kulcs, így a mennyiség összeadódik. */
export const buildLineId = (itemId, { variant, isMenu, side, sauce, addons }) =>
  [
    itemId,
    variant ?? '',
    isMenu ? 'menu' : '',
    side?.id ?? '',
    sauce?.id ?? '',
    addons.map((addon) => addon.id).sort().join('+'),
  ].join('|');

export const createCartLine = (item, options, quantity) => ({
  lineId: buildLineId(item.id, options),
  itemId: item.id,
  name: item.name,
  unitPrice: calculateUnitPrice(item, options),
  quantity,
  options,
});

/** Olvasható összefoglaló sorok a kosárhoz és a rendelés összesítőhöz. */
export const describeLineOptions = ({ variant, isMenu, side, sauce, addons }) => {
  const details = [];

  if (variant) details.push(variant);

  if (isMenu) {
    const sideLabel = side
      ? `${side.name}${side.surcharge ? ` (+${formatPrice(side.surcharge)})` : ''}`
      : null;
    details.push(['Menüben', sideLabel, sauce?.name].filter(Boolean).join(' · '));
  }

  if (addons.length > 0) {
    details.push(`+ ${addons.map((addon) => addon.name).join(', ')}`);
  }

  return details;
};
