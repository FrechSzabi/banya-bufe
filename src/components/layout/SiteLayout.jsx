import { Outlet } from 'react-router';
import { CartProvider } from '../../context/CartContext';
import Cart from '../order/Cart';
import MobileCartBar from '../order/MobileCartBar';
import Footer from './Footer';
import Header from './Header';
import ScrollManager from './ScrollManager';

/** A nyilvános oldal kerete: fejléc, lábléc, kosár. Az admin felület ezen kívül él. */
export default function SiteLayout() {
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
        <Outlet />
      </main>

      <Footer />
      <Cart />
      <MobileCartBar />
    </CartProvider>
  );
}
