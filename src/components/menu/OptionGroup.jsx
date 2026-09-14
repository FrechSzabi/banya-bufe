import { Check } from 'lucide-react';
import { useId } from 'react';
import { formatPrice } from '../../utils/formatPrice';

/**
 * Választó csoport (radio vagy checkbox) kártyás megjelenéssel.
 * options: [{ value, label, price? }] – a price felárként jelenik meg.
 */
export default function OptionGroup({ legend, type = 'radio', options, selected, onChange, columns = 1 }) {
  const name = useId();
  const isChecked = (value) => (type === 'radio' ? selected === value : selected.includes(value));

  return (
    <fieldset>
      <legend className="mb-3 font-condensed text-sm font-semibold uppercase tracking-[0.25em] text-mustard">
        {legend}
      </legend>
      <div className={`grid gap-2 ${columns === 2 ? 'sm:grid-cols-2' : ''}`}>
        {options.map(({ value, label, price }) => {
          const checked = isChecked(value);
          return (
            <label
              key={value}
              className={`relative flex cursor-pointer items-center gap-3 border px-3.5 py-3 transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-mustard ${
                checked ? 'border-mustard bg-mustard/10' : 'border-steel bg-ink hover:border-bone/40'
              }`}
            >
              <input
                type={type}
                name={name}
                value={value}
                checked={checked}
                onChange={() => onChange(value)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={`grid size-5 shrink-0 place-items-center border ${type === 'radio' ? 'rounded-full' : ''} ${
                  checked ? 'border-mustard bg-mustard text-ink' : 'border-steel'
                }`}
              >
                {checked && <Check className="size-3.5" strokeWidth={3} />}
              </span>
              <span className="flex-1 text-bone">{label}</span>
              {price > 0 && <span className="text-sm text-ash tabular-nums">+{formatPrice(price)}</span>}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
