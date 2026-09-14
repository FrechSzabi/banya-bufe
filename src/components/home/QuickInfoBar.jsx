import { Clock, ThumbsUp, Truck, Wallet } from 'lucide-react';
import { businessInfo } from '../../data/businessInfo';
import { useOpeningStatus } from '../../hooks/useOpeningStatus';

const STATUS_COLORS = { open: 'text-go', soon: 'text-mustard', closed: 'text-signal' };

const InfoTile = ({ icon: Icon, value, label, valueClassName = 'text-bone' }) => (
  <li className="flex items-start gap-3 bg-coal p-4 sm:p-5">
    <Icon aria-hidden="true" className="mt-1 size-5 shrink-0 text-mustard" />
    <div className="min-w-0">
      <p className={`font-display text-2xl leading-none tracking-wide sm:text-3xl ${valueClassName}`}>{value}</p>
      <p className="mt-1 text-sm leading-snug text-ash">{label}</p>
    </div>
  </li>
);

export default function QuickInfoBar() {
  const status = useOpeningStatus();
  const { rating, priceRange, delivery } = businessInfo;

  return (
    <section aria-label="Gyors információk" className="relative z-10 mx-auto -mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
      <ul className="grid grid-cols-2 gap-px border border-steel bg-steel shadow-2xl lg:grid-cols-4 lg:[&>li:nth-child(odd)]:translate-y-3">
        <InfoTile
          icon={ThumbsUp}
          value={`${rating.recommendPercent}% ajánlja`}
          label={`${rating.reviewCount} értékelés alapján`}
        />
        <InfoTile icon={Wallet} value={priceRange} label="Árkategória – kiadós adagok" />
        <InfoTile
          icon={Clock}
          value={status.label}
          label={status.detail}
          valueClassName={STATUS_COLORS[status.state]}
        />
        <InfoTile icon={Truck} value={`${delivery.areas.length} település`} label={delivery.areas.join(', ')} />
      </ul>
    </section>
  );
}
