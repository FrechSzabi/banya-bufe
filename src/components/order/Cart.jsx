import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';
import Button from '../common/Button';
import Modal from '../common/Modal';
import CartItem from './CartItem';

/** Oldalsó kosár panel (drawer), a headerben lévő kosár ikonnal nyílik. */
export default function Cart() {
  const { lines, isOpen, closeCart, itemCount, subtotal } = useCart();
  const navigate = useNavigate();

  const goTo = (path) => {
    closeCart();
    navigate(path);
  };

  const footer =
    lines.length > 0 ? (
      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between">
          <span className="font-condensed uppercase tracking-widest text-ash">Részösszeg</span>
          <span className="font-display text-3xl tracking-wide text-bone">{formatPrice(subtotal)}</span>
        </div>
        <Button size="lg" onClick={() => goTo('/rendeles')}>
          Tovább a rendeléshez <ArrowRight aria-hidden="true" className="size-5" />
        </Button>
        <Button variant="ghost" size="sm" onClick={closeCart}>
          Válogatok még
        </Button>
      </div>
    ) : null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeCart}
      placement="right"
      title="Kosár"
      subtitle={itemCount > 0 ? `${itemCount} tétel` : undefined}
      footer={footer}
    >
      {lines.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 py-16 text-center">
          <ShoppingBag aria-hidden="true" className="size-14 text-steel" />
          <p className="font-display text-3xl tracking-wide">Üres a kosár</p>
          <p className="max-w-60 text-ash">Nézz szét az étlapon – a Bánya burger már vár.</p>
          <Button variant="outline" onClick={() => goTo('/#etlap')}>
            Irány az étlap
          </Button>
        </div>
      ) : (
        <ul>
          {lines.map((line) => (
            <li key={line.lineId}>
              <CartItem line={line} />
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
}
