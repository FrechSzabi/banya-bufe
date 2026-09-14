import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

export default function CartButton() {
  const { itemCount, openCart } = useCart();
  const label = itemCount > 0 ? `Kosár megnyitása, ${itemCount} tétel` : 'Kosár megnyitása, üres';

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={label}
      className="relative grid size-11 place-items-center text-bone transition hover:text-mustard"
    >
      <ShoppingBag aria-hidden="true" className="size-6" />
      {itemCount > 0 && (
        <span
          key={itemCount}
          aria-hidden="true"
          className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 animate-[ping_0.4s_ease-out_1_reverse] place-items-center rounded-full bg-mustard px-1 font-condensed text-xs font-bold text-ink shadow-[0_0_12px_rgb(244_196_48/0.7)]"
        >
          {itemCount}
        </span>
      )}
    </button>
  );
}
