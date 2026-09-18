import { useState } from 'react';
import { Ban, Banknote, CreditCard, MapPin, MessageSquareText, Phone } from 'lucide-react';
import { businessInfo } from '../../data/businessInfo';
import { ACTIVE_STATUS_IDS, CANCELLED_STATUS_ID, getOrderStatusLabel } from '../../data/orderStatuses';
import { getPaymentMethodLabel } from '../../data/paymentMethods';
import { describeLineOptions } from '../../utils/cartLine';
import { formatPrice } from '../../utils/formatPrice';
import OrderStatusControl from './OrderStatusControl';
import { STATUS_STYLES } from './orderStatusStyles';

const timeFormatter = new Intl.DateTimeFormat('hu-HU', {
  timeZone: businessInfo.timeZone,
  hour: '2-digit',
  minute: '2-digit',
});
const dateFormatter = new Intl.DateTimeFormat('hu-HU', {
  timeZone: businessInfo.timeZone,
  month: 'short',
  day: 'numeric',
});

const minutesSince = (isoDate) => Math.max(0, Math.floor((Date.now() - new Date(isoDate)) / 60_000));

const formatAge = (minutes) => {
  if (minutes < 1) return 'most';
  if (minutes < 60) return `${minutes} perce`;
  const hours = Math.floor(minutes / 60);
  return hours < 24 ? `${hours} órája` : null;
};

const PAYMENT_ICONS = { cash: Banknote, card: CreditCard };

/** Kétlépcsős lemondás: egy félrekoppintás ne mondjon le rendelést. */
function CancelOrderButton({ disabled, onCancel }) {
  const [isConfirming, setIsConfirming] = useState(false);

  if (!isConfirming) {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsConfirming(true)}
        className="inline-flex w-fit items-center gap-1.5 self-end font-condensed text-sm font-semibold uppercase tracking-wider text-ash transition hover:text-signal disabled:opacity-50"
      >
        <Ban aria-hidden="true" className="size-4" /> Lemondás
      </button>
    );
  }

  return (
    <div role="alert" className="flex flex-wrap items-center justify-between gap-2 border border-signal/60 bg-signal/10 p-2">
      <span className="px-1 text-sm font-semibold text-bone">Biztosan lemondod a rendelést?</span>
      <div className="flex gap-1.5">
        <button
          type="button"
          onClick={() => setIsConfirming(false)}
          className="min-h-10 border border-steel bg-ink px-3 font-condensed text-sm font-semibold uppercase tracking-wider text-bone/80 hover:border-bone/50"
        >
          Mégse
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={onCancel}
          className="min-h-10 border border-signal bg-signal px-3 font-condensed text-sm font-semibold uppercase tracking-wider text-ink disabled:opacity-50"
        >
          Igen, lemondom
        </button>
      </div>
    </div>
  );
}

export default function OrderCard({ order, isPending, onStatusChange }) {
  const { orderNumber, status, customer, lines, total, createdAt } = order;
  const created = new Date(createdAt);
  const isActive = ACTIVE_STATUS_IDS.includes(status);
  const isCancelled = status === CANCELLED_STATUS_ID;
  const age = formatAge(minutesSince(createdAt));
  const PaymentIcon = PAYMENT_ICONS[customer.paymentMethod] ?? Banknote;

  return (
    <article
      aria-labelledby={`order-${order.id}`}
      className={`flex flex-col border border-steel border-t-4 bg-coal ${STATUS_STYLES[status]?.accent ?? ''} ${
        isPending ? 'opacity-60' : ''
      }`}
    >
      <header className="flex items-start justify-between gap-3 border-b border-steel px-4 py-3">
        <div>
          <h3 id={`order-${order.id}`} className="font-display text-3xl leading-none tracking-wide text-mustard">
            {orderNumber}
          </h3>
          <p className="mt-1 text-sm text-ash">
            <time dateTime={createdAt}>
              {!isActive && `${dateFormatter.format(created)} `}
              {timeFormatter.format(created)}
            </time>
            {isActive && age && <> · {age}</>}
          </p>
        </div>
        <span
          className={`shrink-0 px-2 py-0.5 font-condensed text-xs font-semibold uppercase tracking-widest ${STATUS_STYLES[status]?.badge ?? ''}`}
        >
          {getOrderStatusLabel(status)}
        </span>
      </header>

      <div className="flex flex-col gap-2 px-4 py-3 text-bone/90">
        <p className="font-condensed text-xl font-semibold leading-tight text-bone">{customer.name}</p>
        <a href={`tel:${customer.phone}`} className="flex w-fit items-center gap-2 transition hover:text-mustard">
          <Phone aria-hidden="true" className="size-4 shrink-0 text-mustard" />
          <span className="tabular-nums">{customer.phone}</span>
        </a>
        <p className="flex gap-2">
          <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-mustard" />
          <span>
            <strong className="font-semibold text-bone">{customer.town}</strong>, {customer.address}
          </span>
        </p>
        {customer.note && (
          <p className="flex gap-2 border border-mustard/40 bg-mustard/10 px-3 py-2 text-sm text-bone">
            <MessageSquareText aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-mustard" />
            <span className="whitespace-pre-line break-words">{customer.note}</span>
          </p>
        )}
      </div>

      <ul className="flex flex-col gap-2 border-t border-dashed border-steel px-4 py-3">
        {lines.map((line) => (
          <li key={line.lineId} className="flex gap-3">
            <span className="w-8 shrink-0 font-condensed text-lg font-bold leading-tight text-mustard tabular-nums">
              {line.quantity}×
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold leading-tight">{line.name}</p>
              {describeLineOptions(line.options).map((detail) => (
                <p key={detail} className="text-sm leading-snug text-ash">
                  {detail}
                </p>
              ))}
            </div>
            <span className="shrink-0 text-sm text-bone/70 tabular-nums">
              {formatPrice(line.unitPrice * line.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-3 border-t border-steel px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-sm text-bone/80">
            <PaymentIcon aria-hidden="true" className="size-4 text-mustard" />
            {getPaymentMethodLabel(customer.paymentMethod)}
          </span>
          <span className={`font-display text-3xl leading-none tracking-wide ${isCancelled ? 'text-ash line-through' : ''}`}>
            {formatPrice(total)}
          </span>
        </div>
        <OrderStatusControl
          orderNumber={orderNumber}
          status={status}
          disabled={isPending}
          onChange={(nextStatus) => onStatusChange(order.id, nextStatus)}
        />
        {!isCancelled && (
          <CancelOrderButton disabled={isPending} onCancel={() => onStatusChange(order.id, CANCELLED_STATUS_ID)} />
        )}
      </div>
    </article>
  );
}
