const priceFormatter = new Intl.NumberFormat('hu-HU', { maximumFractionDigits: 0 });

/** 3190 → "3 190 Ft" */
export const formatPrice = (amount) => `${priceFormatter.format(amount)} Ft`;
