import { useEffect } from 'react';
import AdminLogin from '../components/admin/AdminLogin';
import OrderDashboard from '../components/admin/OrderDashboard';
import { useAdminSession } from '../hooks/useAdminSession';

export default function AdminPage() {
  const session = useAdminSession();

  useEffect(() => {
    document.title = 'Rendelések · Bánya Büfé';
  }, []);

  return (
    <>
      <meta name="robots" content="noindex, nofollow" />

      {session.status === 'authenticated' && (
        <OrderDashboard onLogout={session.logout} onAuthError={session.handleError} />
      )}
      {session.status === 'guest' && <AdminLogin onLogin={session.login} />}
    </>
  );
}
