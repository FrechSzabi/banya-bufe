import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { config } from './config.js';

mkdirSync(dirname(config.dbPath), { recursive: true });

const db = new DatabaseSync(config.dbPath);

db.exec(`
  PRAGMA journal_mode = WAL;

  CREATE TABLE IF NOT EXISTS orders (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    status          TEXT    NOT NULL DEFAULT 'new',
    customer_name   TEXT    NOT NULL,
    phone           TEXT    NOT NULL,
    town            TEXT    NOT NULL,
    address         TEXT    NOT NULL,
    note            TEXT    NOT NULL DEFAULT '',
    payment_method  TEXT    NOT NULL,
    lines_json      TEXT    NOT NULL,
    subtotal        INTEGER NOT NULL,
    delivery_fee    INTEGER NOT NULL,
    total           INTEGER NOT NULL,
    created_at      TEXT    NOT NULL,
    updated_at      TEXT    NOT NULL
  );

  CREATE INDEX IF NOT EXISTS orders_status_created ON orders (status, created_at);
`);

/** 12 → "BB-260012" (évszám + sorszám) */
const formatOrderNumber = (id, createdAt) => `BB-${createdAt.slice(2, 4)}${String(id).padStart(4, '0')}`;

const toOrder = (row) => ({
  id: row.id,
  orderNumber: formatOrderNumber(row.id, row.created_at),
  status: row.status,
  customer: {
    name: row.customer_name,
    phone: row.phone,
    town: row.town,
    address: row.address,
    note: row.note,
    paymentMethod: row.payment_method,
  },
  lines: JSON.parse(row.lines_json),
  subtotal: row.subtotal,
  deliveryFee: row.delivery_fee,
  total: row.total,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const insertStatement = db.prepare(`
  INSERT INTO orders (customer_name, phone, town, address, note, payment_method,
                      lines_json, subtotal, delivery_fee, total, created_at, updated_at)
  VALUES (:name, :phone, :town, :address, :note, :paymentMethod,
          :linesJson, :subtotal, :deliveryFee, :total, :now, :now)
  RETURNING *
`);

export const insertOrder = ({ customer, lines, subtotal, deliveryFee, total }) =>
  toOrder(
    insertStatement.get({
      name: customer.name,
      phone: customer.phone,
      town: customer.town,
      address: customer.address,
      note: customer.note,
      paymentMethod: customer.paymentMethod,
      linesJson: JSON.stringify(lines),
      subtotal,
      deliveryFee,
      total,
      now: new Date().toISOString(),
    }),
  );

/** Adott állapotú rendelések; alapból a legrégebbi elöl (konyhai sorrend), `newestFirst`-tel fordítva. */
export const listOrders = ({ statuses, newestFirst = false, limit = 200 }) => {
  const placeholders = statuses.map(() => '?').join(', ');
  const rows = db
    .prepare(
      `SELECT * FROM orders WHERE status IN (${placeholders})
       ORDER BY created_at ${newestFirst ? 'DESC' : 'ASC'} LIMIT ?`,
    )
    .all(...statuses, limit);
  return rows.map(toOrder);
};

const updateStatusStatement = db.prepare(`
  UPDATE orders SET status = :status, updated_at = :now WHERE id = :id RETURNING *
`);

export const updateOrderStatus = (id, status) => {
  const row = updateStatusStatement.get({ id, status, now: new Date().toISOString() });
  return row ? toOrder(row) : null;
};
