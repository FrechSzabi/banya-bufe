import { businessInfo } from '../data/businessInfo';

export const OTHER_TOWN = 'other';

/** Elfogadja: 06 30 123 4567, +36301234567, 06-1-234-5678 stb. */
const HUNGARIAN_PHONE_PATTERN = /^(\+36|06)\d{8,9}$/;

export const normalizePhone = (value) => value.replace(/[\s\-/().]/g, '');

export const isDeliverableTown = (town) => businessInfo.delivery.areas.includes(town);

const validators = {
  name: (value) => {
    if (!value.trim()) return 'Kérjük, add meg a neved.';
    if (value.trim().length < 2) return 'A név legalább 2 karakter legyen.';
    return null;
  },
  phone: (value) => {
    if (!value.trim()) return 'Kérjük, add meg a telefonszámod.';
    if (!HUNGARIAN_PHONE_PATTERN.test(normalizePhone(value))) {
      return 'Érvénytelen formátum. Példa: 06 30 123 4567 vagy +36 30 123 4567';
    }
    return null;
  },
  town: (value) => {
    if (!value) return 'Válaszd ki a települést.';
    if (!isDeliverableTown(value)) return 'Sajnos erre a településre nem szállítunk.';
    return null;
  },
  address: (value) => {
    if (!value.trim()) return 'Kérjük, add meg az utcát és a házszámot.';
    if (!/\d/.test(value)) return 'Add meg a házszámot is.';
    return null;
  },
  paymentMethod: (value) => (value ? null : 'Válassz fizetési módot.'),
};

export const validateField = (field, value) => validators[field]?.(value) ?? null;

export const validateCheckout = (values) =>
  Object.keys(validators).reduce((errors, field) => {
    const error = validateField(field, values[field]);
    return error ? { ...errors, [field]: error } : errors;
  }, {});
