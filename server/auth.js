import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { config } from './config.js';

export const SESSION_COOKIE = 'bb_admin';
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // egy műszak + ráhagyás

const sha256 = (value) => createHash('sha256').update(String(value)).digest();
const sign = (payload) => createHmac('sha256', config.sessionSecret).update(payload).digest('base64url');

/** Időzítés-biztos összehasonlítás (fix hosszú hash-eken, így a hossz sem szivárog). */
const safeEqual = (a, b) => timingSafeEqual(sha256(a), sha256(b));

export const isAdminConfigured = () => Boolean(config.adminPassword);

export const checkPassword = (password) =>
  isAdminConfigured() && typeof password === 'string' && safeEqual(password, config.adminPassword);

/** Token: "<lejárat ms>.<HMAC>" – állapotmentes, adatbázis nélkül ellenőrizhető. */
const createSessionToken = () => {
  const expiresAt = String(Date.now() + SESSION_TTL_MS);
  return `${expiresAt}.${sign(expiresAt)}`;
};

const isValidSessionToken = (token) => {
  const [expiresAt, signature] = String(token ?? '').split('.');
  if (!expiresAt || !signature) return false;
  return Number(expiresAt) > Date.now() && safeEqual(signature, sign(expiresAt));
};

const parseCookies = (header = '') =>
  Object.fromEntries(
    header
      .split(';')
      .map((part) => part.trim().split('='))
      .filter(([name, value]) => name && value !== undefined)
      .map(([name, ...rest]) => [name, decodeURIComponent(rest.join('='))]),
  );

const cookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
  path: '/api/admin',
};

// HTTPS-en (proxy mögött TRUST_PROXY kell hozzá) a süti csak titkosított kapcsolaton megy
export const setSessionCookie = (req, res) =>
  res.cookie(SESSION_COOKIE, createSessionToken(), { ...cookieOptions, secure: req.secure, maxAge: SESSION_TTL_MS });

export const clearSessionCookie = (res) => res.clearCookie(SESSION_COOKIE, cookieOptions);

export const requireAdmin = (req, res, next) => {
  if (isValidSessionToken(parseCookies(req.headers.cookie)[SESSION_COOKIE])) return next();
  res.status(401).json({ error: 'Bejelentkezés szükséges.' });
};
