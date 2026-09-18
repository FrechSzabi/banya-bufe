import { businessInfo } from '../src/data/businessInfo.js';
import { addonGroups, allowsAddons, hasMenuOption, hasVariants, menuCategories, menuOption } from '../src/data/menuData.js';
import { PAYMENT_METHODS } from '../src/data/paymentMethods.js';
import { createCartLine } from '../src/utils/cartLine.js';
import { normalizePhone, validateCheckout } from '../src/utils/checkoutValidation.js';

const MAX_LINES = 50;
const MAX_QUANTITY = 99;
const TEXT_LIMITS = { name: 100, phone: 30, town: 60, address: 200, note: 500 };

const itemsById = new Map(menuCategories.flatMap((category) => category.items).map((item) => [item.id, item]));
const ALL_ADDONS = [...addonGroups.extras, ...addonGroups.sauces].map(({ id, name, price }) => ({ id, name, price }));

export class OrderValidationError extends Error {}

const fail = (message) => {
  throw new OrderValidationError(message);
};

/**
 * A kliens csak azonosítókat küld (tétel, fajta, köret, szósz, extrák) –
 * a neveket és árakat itt, az étlapból rakjuk össze, így a kosár ára nem hamisítható.
 */
const buildLine = (raw) => {
  const item = itemsById.get(raw?.itemId) ?? fail('Ismeretlen tétel a kosárban.');
  const { quantity } = raw;
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) fail('Érvénytelen mennyiség.');

  const options = raw.options ?? {};

  let variant = null;
  if (hasVariants(item)) {
    if (!item.variants.includes(options.variant)) fail(`Érvénytelen fajta: ${item.name}.`);
    variant = options.variant;
  }

  const isMenu = hasMenuOption(item) && options.isMenu === true;
  const side = isMenu ? (menuOption.sides.find((s) => s.id === options.sideId) ?? fail('Érvénytelen köret.')) : null;
  const sauce = isMenu ? (menuOption.sauces.find((s) => s.id === options.sauceId) ?? fail('Érvénytelen szósz.')) : null;

  const addonIds = Array.isArray(options.addonIds) ? options.addonIds : [];
  if (addonIds.length > 0 && !allowsAddons(item)) fail(`Ehhez nem kérhető extra: ${item.name}.`);
  const addons = ALL_ADDONS.filter((addon) => addonIds.includes(addon.id));
  if (addons.length !== new Set(addonIds).size) fail('Ismeretlen extra a kosárban.');

  return createCartLine(item, { variant, isMenu, side, sauce, addons }, quantity);
};

const buildCustomer = (raw = {}) => {
  const customer = Object.fromEntries(
    Object.keys(TEXT_LIMITS).map((field) => [field, typeof raw[field] === 'string' ? raw[field].trim() : '']),
  );
  customer.paymentMethod = raw.paymentMethod;

  const [firstError] = Object.values(validateCheckout(customer));
  if (firstError) fail(firstError);

  for (const [field, limit] of Object.entries(TEXT_LIMITS)) {
    if (customer[field].length > limit) fail('Túl hosszú szöveg az űrlapon.');
  }
  if (!PAYMENT_METHODS.some((method) => method.value === customer.paymentMethod)) fail('Érvénytelen fizetési mód.');

  return { ...customer, phone: normalizePhone(customer.phone) };
};

export const buildOrder = (payload) => {
  const rawLines = payload?.lines;
  if (!Array.isArray(rawLines) || rawLines.length === 0) fail('Üres a kosár.');
  if (rawLines.length > MAX_LINES) fail('Túl sok tétel a kosárban.');

  const customer = buildCustomer(payload.customer);
  const lines = rawLines.map(buildLine);
  const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
  const deliveryFee = businessInfo.delivery.fee ?? 0;

  return { customer, lines, subtotal, deliveryFee, total: subtotal + deliveryFee };
};
