/**
 * Rendelés állapotok – a frontend (admin) és a backend közös forrása.
 * A sorrend a rendelés útja a konyhától az átadásig; a lemondás ezen kívül esik.
 */
export const CANCELLED_STATUS_ID = 'cancelled';

export const ORDER_STATUSES = [
  { id: 'new', label: 'Új' },
  { id: 'ready', label: 'Kész' },
  { id: 'delivering', label: 'Kiszállítás alatt' },
  { id: 'completed', label: 'Befejezett' },
  { id: CANCELLED_STATUS_ID, label: 'Lemondva' },
];

/** A normál munkafolyamat állapotai (lemondás nélkül) – ezek a kártyák állapotgombjai. */
export const WORKFLOW_STATUSES = ORDER_STATUSES.filter((status) => status.id !== CANCELLED_STATUS_ID);

export const ORDER_STATUS_IDS = ORDER_STATUSES.map((status) => status.id);

/** A még folyamatban lévő (nem lezárt) állapotok. */
export const ACTIVE_STATUS_IDS = ['new', 'ready', 'delivering'];

/** Admin nézetek → mely állapotú rendeléseket mutatják. */
export const ORDER_VIEWS = {
  active: ACTIVE_STATUS_IDS,
  completed: ['completed'],
  cancelled: [CANCELLED_STATUS_ID],
};

export const isValidOrderStatus = (status) => ORDER_STATUS_IDS.includes(status);

export const getOrderStatusLabel = (status) =>
  ORDER_STATUSES.find((candidate) => candidate.id === status)?.label ?? status;
