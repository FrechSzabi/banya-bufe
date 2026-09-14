import { businessInfo } from '../../data/businessInfo';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';
import CartItem from './CartItem';

const formatDeliveryFee = (fee) => {
  if (fee === null) return 'Egyeztetés szerint'; // TODO: valós szállítási díj
  return fee === 0 ? 'Ingyenes' : formatPrice(fee);
};

export default function OrderSummary() {
  const { lines, subtotal, itemCount } = useCart();
  const { fee, estimatedMinutes } = businessInfo.delivery;
  const total = subtotal + (fee ?? 0);

  return (
    <aside aria-labelledby="osszesito-cim" className="border-4 border-bone bg-coal">
      <div aria-hidden="true" className="hazard h-2" />
      <div className="p-5 sm:p-6">
        <h2 id="osszesito-cim" className="font-display text-4xl leading-none tracking-wide">
          Rendelésed
        </h2>
        <p className="mt-1 text-sm text-ash">{itemCount} tétel</p>

        <ul className="mt-2">
          {lines.map((line) => (
            <li key={line.lineId}>
              <CartItem line={line} />
            </li>
          ))}
        </ul>

        <dl className="mt-4 flex flex-col gap-2 text-bone/85">
          <div className="flex justify-between">
            <dt>Részösszeg</dt>
            <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Kiszállítás</dt>
            <dd>{formatDeliveryFee(fee)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Becsült idő</dt>
            <dd>
              {estimatedMinutes.min}–{estimatedMinutes.max} perc
            </dd>
          </div>
          <div className="mt-2 flex items-baseline justify-between border-t-2 border-dashed border-steel pt-4">
            <dt className="font-condensed text-lg font-bold uppercase tracking-widest text-bone">Fizetendő</dt>
            <dd className="font-display text-5xl leading-none tracking-wide neon-mustard">{formatPrice(total)}</dd>
          </div>
        </dl>
      </div>
    </aside>
  );
}
