import { CircleCheck, Phone } from 'lucide-react';
import { businessInfo } from '../../data/businessInfo';
import { formatPrice } from '../../utils/formatPrice';
import Button from '../common/Button';
import Modal from '../common/Modal';

export default function OrderConfirmation({ order, onClose }) {
  if (!order) return null;

  const { orderNumber, estimatedMinutes, total, customerName } = order;

  return (
    <Modal
      isOpen
      onClose={onClose}
      title="Megkaptuk!"
      footer={
        <Button size="lg" className="w-full" onClick={onClose} data-autofocus>
          Rendben
        </Button>
      }
    >
      <div className="flex flex-col items-center gap-5 py-2 text-center" role="status">
        <CircleCheck aria-hidden="true" className="size-16 text-go drop-shadow-[0_0_14px_rgb(123_227_143/0.6)]" />
        <p className="text-lg text-bone">
          Köszönjük, <strong>{customerName}</strong>! A rendelésed rögzítettük.
        </p>

        <dl className="grid w-full grid-cols-2 gap-px border border-steel bg-steel text-left">
          <div className="bg-ink p-4">
            <dt className="font-condensed text-xs uppercase tracking-[0.25em] text-ash">Rendelésszám</dt>
            <dd className="mt-1 font-display text-3xl tracking-wide text-mustard">{orderNumber}</dd>
          </div>
          <div className="bg-ink p-4">
            <dt className="font-condensed text-xs uppercase tracking-[0.25em] text-ash">Becsült szállítás</dt>
            <dd className="mt-1 font-display text-3xl tracking-wide">
              {estimatedMinutes.min}–{estimatedMinutes.max} perc
            </dd>
          </div>
          <div className="col-span-2 bg-ink p-4">
            <dt className="font-condensed text-xs uppercase tracking-[0.25em] text-ash">Fizetendő átvételkor</dt>
            <dd className="mt-1 font-display text-3xl tracking-wide">{formatPrice(total)}</dd>
          </div>
        </dl>

        <p className="flex items-center gap-2 text-sm text-ash">
          <Phone aria-hidden="true" className="size-4" />
          Kérdés esetén:{' '}
          <a href={businessInfo.phone.href} className="font-semibold text-bone underline">
            {businessInfo.phone.display}
          </a>
        </p>
      </div>
    </Modal>
  );
}
