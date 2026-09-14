import { Minus, Plus } from 'lucide-react';

export default function QuantityStepper({ value, onChange, min = 1, max = 99, label, size = 'md' }) {
  const buttonSize = size === 'sm' ? 'size-8' : 'size-11';
  const buttonClasses = `${buttonSize} grid place-items-center text-bone transition hover:bg-mustard hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-bone`;

  return (
    <div role="group" aria-label={label} className="inline-flex items-center border border-steel bg-ink">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Mennyiség csökkentése"
        className={buttonClasses}
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <output aria-live="polite" className="min-w-8 text-center font-condensed text-lg font-semibold tabular-nums">
        {value}
      </output>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Mennyiség növelése"
        className={buttonClasses}
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
