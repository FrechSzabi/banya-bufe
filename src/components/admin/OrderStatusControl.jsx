import { WORKFLOW_STATUSES } from '../../data/orderStatuses';
import { STATUS_STYLES } from './orderStatusStyles';

/** Szegmentált kapcsoló: egy koppintással bármelyik állapotba tehető (lemondottnál: visszaállítható) a rendelés. */
export default function OrderStatusControl({ orderNumber, status, disabled, onChange }) {
  return (
    <div role="group" aria-label={`${orderNumber} állapota`} className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
      {WORKFLOW_STATUSES.map(({ id, label }) => {
        const isCurrent = id === status;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={isCurrent}
            disabled={disabled || isCurrent}
            onClick={() => onChange(id)}
            className={`min-h-11 border px-2 py-2 font-condensed text-sm font-semibold uppercase leading-tight tracking-wider transition disabled:cursor-default ${
              isCurrent
                ? STATUS_STYLES[id].selected
                : 'border-steel bg-ink text-bone/80 hover:border-bone/50 hover:text-bone disabled:opacity-50'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
