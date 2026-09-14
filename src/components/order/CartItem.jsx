import { Trash2 } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { describeLineOptions } from '../../utils/cartLine';
import { formatPrice } from '../../utils/formatPrice';
import QuantityStepper from '../common/QuantityStepper';

export default function CartItem({ line }) {
  const { updateQuantity, removeLine } = useCart();
  const details = describeLineOptions(line.options);

  return (
    <article className="flex flex-col gap-3 border-b border-steel py-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-condensed text-lg font-bold uppercase leading-tight tracking-wide">{line.name}</h3>
          {details.map((detail) => (
            <p key={detail} className="text-sm text-ash">
              {detail}
            </p>
          ))}
        </div>
        <button
          type="button"
          onClick={() => removeLine(line.lineId)}
          aria-label={`${line.name} eltávolítása a kosárból`}
          className="grid size-9 shrink-0 place-items-center text-ash transition hover:text-signal"
        >
          <Trash2 aria-hidden="true" className="size-4" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <QuantityStepper
          size="sm"
          min={0}
          value={line.quantity}
          onChange={(quantity) => updateQuantity(line.lineId, quantity)}
          label={`${line.name} mennyisége`}
        />
        <div className="text-right">
          <p className="font-display text-2xl leading-none tracking-wide text-mustard">
            {formatPrice(line.unitPrice * line.quantity)}
          </p>
          {line.quantity > 1 && <p className="text-xs text-ash">{formatPrice(line.unitPrice)} / db</p>}
        </div>
      </div>
    </article>
  );
}
