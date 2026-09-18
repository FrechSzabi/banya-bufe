/** Lejárt / hiányzó admin munkamenet – a felület erre a belépő képernyőre vált. */
export class AdminAuthError extends Error {}

const request = async (path, { method = 'GET', body } = {}) => {
  const response = await fetch(`/api/admin${path}`, {
    method,
    credentials: 'same-origin',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => ({}));
  if (response.status === 401) throw new AdminAuthError(data.error ?? 'Bejelentkezés szükséges.');
  if (!response.ok) throw new Error(data.error ?? 'Hiba történt. Próbáld újra!');
  return data;
};

export const adminApi = {
  checkSession: () => request('/session'),
  login: (password) => request('/login', { method: 'POST', body: { password } }),
  logout: () => request('/logout', { method: 'POST' }),
  /** view: 'active' (új, kész, kiszállítás alatt) | 'completed' | 'cancelled' */
  fetchOrders: (view) => request(`/orders?view=${view}`).then((data) => data.orders),
  updateStatus: (id, status) =>
    request(`/orders/${id}`, { method: 'PATCH', body: { status } }).then((data) => data.order),
};
