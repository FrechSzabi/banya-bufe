import { existsSync } from 'node:fs';
import express from 'express';
import { businessInfo } from '../src/data/businessInfo.js';
import { ORDER_VIEWS, isValidOrderStatus } from '../src/data/orderStatuses.js';
import { checkPassword, clearSessionCookie, isAdminConfigured, requireAdmin, setSessionCookie } from './auth.js';
import { config } from './config.js';
import { insertOrder, listOrders, updateOrderStatus } from './db.js';
import { OrderValidationError, buildOrder } from './orderBuilder.js';
import { rateLimit } from './rateLimit.js';

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', config.trustProxy);
app.use(express.json({ limit: '50kb' }));

/* ---------------------------- Nyilvános API ---------------------------- */

const orderLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: 'Túl sok rendelés rövid idő alatt. Kérjük, hívj minket telefonon!',
});

app.post('/api/orders', orderLimiter, (req, res) => {
  try {
    const order = insertOrder(buildOrder(req.body));
    console.log(`[rendelés] ${order.orderNumber} – ${order.customer.name}, ${order.total} Ft`);
    res.status(201).json({
      orderNumber: order.orderNumber,
      total: order.total,
      estimatedMinutes: businessInfo.delivery.estimatedMinutes,
    });
  } catch (error) {
    if (error instanceof OrderValidationError) return res.status(400).json({ error: error.message });
    throw error;
  }
});

/* ------------------------------ Admin API ------------------------------ */

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Túl sok belépési kísérlet. Próbáld újra 15 perc múlva.',
});

app.use('/api/admin', (req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

app.post('/api/admin/login', loginLimiter, (req, res) => {
  if (!isAdminConfigured()) return res.status(503).json({ error: 'Az admin jelszó nincs beállítva a szerveren.' });
  if (!checkPassword(req.body?.password)) return res.status(401).json({ error: 'Hibás jelszó.' });
  setSessionCookie(req, res);
  res.json({ ok: true });
});

app.post('/api/admin/logout', (req, res) => {
  clearSessionCookie(res);
  res.json({ ok: true });
});

app.get('/api/admin/session', requireAdmin, (req, res) => res.json({ ok: true }));

const CLOSED_LIST_LIMIT = 100;

app.get('/api/admin/orders', requireAdmin, (req, res) => {
  const view = Object.hasOwn(ORDER_VIEWS, req.query.view) ? req.query.view : 'active';
  // Folyamatban: legrégebbi elöl (konyhai sorrend); lezártak: legújabb elöl, az utolsó 100
  const orders =
    view === 'active'
      ? listOrders({ statuses: ORDER_VIEWS.active })
      : listOrders({ statuses: ORDER_VIEWS[view], newestFirst: true, limit: CLOSED_LIST_LIMIT });
  res.json({ orders });
});

app.patch('/api/admin/orders/:id', requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body ?? {};
  if (!Number.isInteger(id) || !isValidOrderStatus(status)) {
    return res.status(400).json({ error: 'Érvénytelen kérés.' });
  }
  const order = updateOrderStatus(id, status);
  if (!order) return res.status(404).json({ error: 'Nincs ilyen rendelés.' });
  res.json({ order });
});

app.use('/api', (req, res) => res.status(404).json({ error: 'Nem található.' }));

/* -------------------- Frontend kiszolgálása (production) -------------------- */

if (existsSync(config.distDir)) {
  app.use(express.static(config.distDir, { index: false }));
  // SPA: minden egyéb GET útvonalra az index.html megy (React Router kezeli)
  app.use((req, res, next) => {
    if (req.method !== 'GET') return next();
    res.sendFile('index.html', { root: config.distDir });
  });
}

/* ------------------------------ Hibakezelés ------------------------------ */

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  if (error.type === 'entity.parse.failed') return res.status(400).json({ error: 'Hibás JSON.' });
  if (error.type === 'entity.too.large') return res.status(413).json({ error: 'Túl nagy kérés.' });
  console.error(error);
  res.status(500).json({ error: 'Szerverhiba.' });
});

app.listen(config.port, () => {
  console.log(`[szerver] Bánya Büfé API: http://localhost:${config.port}`);
});
