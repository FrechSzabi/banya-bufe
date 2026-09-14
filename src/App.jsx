import { Navigate, Route, Routes } from 'react-router';
import { CartProvider } from './context/CartContext';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import ScrollManager from './components/layout/ScrollManager';
import Cart from './components/order/Cart';
import MobileCartBar from './components/order/MobileCartBar';
import HomePage from './pages/HomePage';
import OrderPage from './pages/OrderPage';

export default function App() {
  return (
    <CartProvider>
      <ScrollManager />
      <a
        href="#tartalom"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-mustard focus:px-4 focus:py-2 focus:text-ink"
      >
        Ugrás a tartalomra
      </a>

      <Header />

      <main id="tartalom">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rendeles" element={<OrderPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
      <Cart />
      <MobileCartBar />
    </CartProvider>
  );
}
