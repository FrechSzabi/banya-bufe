import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import SiteLayout from './components/layout/SiteLayout';
import HomePage from './pages/HomePage';
import OrderPage from './pages/OrderPage';

// Az admin kód külön csomagba kerül, a vásárlók nem töltik le
const AdminPage = lazy(() => import('./pages/AdminPage'));

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="rendeles" element={<OrderPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      <Route
        path="admin"
        element={
          <Suspense fallback={null}>
            <AdminPage />
          </Suspense>
        }
      />
    </Routes>
  );
}
