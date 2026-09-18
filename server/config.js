import { randomBytes } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('..', import.meta.url));

/** "1" → 1 (proxy ugrások száma), "true" → true, egyéb szöveg → IP / alhálózat lista az Express szerint. */
const parseTrustProxy = (value) => {
  if (!value || value === 'false') return false;
  if (value === 'true') return true;
  return /^\d+$/.test(value) ? Number(value) : value;
};

if (!process.env.SESSION_SECRET) {
  console.warn('[config] SESSION_SECRET nincs beállítva – újraindításkor az admin belépések érvénytelenné válnak.');
}
if (!process.env.ADMIN_PASSWORD) {
  console.warn('[config] ADMIN_PASSWORD nincs beállítva – az admin felületre nem lehet belépni.');
}

export const config = {
  port: Number(process.env.PORT) || 3001,
  dbPath: process.env.DB_PATH || `${projectRoot}data/orders.db`,
  distDir: `${projectRoot}dist`,
  adminPassword: process.env.ADMIN_PASSWORD || null,
  sessionSecret: process.env.SESSION_SECRET || randomBytes(32).toString('hex'),
  // Reverse proxy (pl. nginx) mögött kell, hogy a rate limit a valódi kliens IP-t lássa
  trustProxy: parseTrustProxy(process.env.TRUST_PROXY),
};
