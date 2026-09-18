import { useCallback, useEffect, useState } from 'react';
import { AdminAuthError, adminApi } from '../services/adminApi';

/** Admin belépési állapot: 'checking' → 'guest' | 'authenticated'. */
export function useAdminSession() {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    adminApi
      .checkSession()
      .then(() => setStatus('authenticated'))
      .catch(() => setStatus('guest'));
  }, []);

  const login = useCallback(async (password) => {
    await adminApi.login(password);
    setStatus('authenticated');
  }, []);

  const logout = useCallback(async () => {
    await adminApi.logout().catch(() => {});
    setStatus('guest');
  }, []);

  /** Bármely admin kérés 401-e esetén hívandó: visszadob a belépéshez. */
  const handleError = useCallback((error) => {
    if (error instanceof AdminAuthError) setStatus('guest');
  }, []);

  return { status, login, logout, handleError };
}
