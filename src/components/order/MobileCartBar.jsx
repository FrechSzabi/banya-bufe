import { ShoppingBag } from 'lucide-react';
import { useLocation } from 'react-router';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';

/** Mobilon alul megjelenő kosár sáv – a vendégek többsége telefonról rendel. */
export default function MobileCartBar() {
  const { itemCount, subtotal, openCart, isOpen } = useCart();
  const { pathname } = useLocation();

  if (itemCount === 0 || isOpen || pathname === '/rendeles') return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden">
      <button
        type="button"
        onClick={openCart}
        className="flex h-14 w-full items-center justify-between bg-mustard px-4 font-condensed text-lg font-bold uppercase tracking-wider text-ink glow-mustard"
      >
        <span className="flex items-center gap-2">
          <ShoppingBag aria-hidden="true" className="size-5" />
          Kosár · {itemCount} tétel
        </span>
        <span className="font-display text-2xl tracking-wide">{formatPrice(subtotal)}</span>
      </button>
    </div>
  );
}
