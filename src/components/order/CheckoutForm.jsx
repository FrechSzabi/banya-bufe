import { Banknote, CreditCard, Loader2, TriangleAlert } from 'lucide-react';
import { businessInfo } from '../../data/businessInfo';
import { PAYMENT_METHODS } from '../../data/paymentMethods';
import { useCheckoutForm } from '../../hooks/useCheckoutForm';
import { useOpeningStatus } from '../../hooks/useOpeningStatus';
import { OTHER_TOWN } from '../../utils/checkoutValidation';
import Button from '../common/Button';
import FormField, { inputClasses } from '../common/FormField';

const PAYMENT_ICONS = { cash: Banknote, card: CreditCard };

const FormBlock = ({ step, title, children }) => (
  <fieldset className="border border-steel bg-coal p-5 sm:p-6">
    <legend className="sr-only">{title}</legend>
    <div aria-hidden="true" className="mb-5 flex items-center gap-3">
      <span className="grid size-8 place-items-center bg-mustard font-display text-xl text-ink">{step}</span>
      <span className="font-display text-3xl leading-none tracking-wide">{title}</span>
    </div>
    <div className="flex flex-col gap-5">{children}</div>
  </fieldset>
);

export default function CheckoutForm({ onSubmit }) {
  const form = useCheckoutForm({ onSubmit });
  const { values, errors } = form;
  const status = useOpeningStatus();
  const fieldProps = (name) => ({
    name,
    value: values[name],
    onChange: form.handleChange,
    onBlur: form.handleBlur,
  });

  return (
    <form noValidate onSubmit={form.handleSubmit} className="flex flex-col gap-5">
      {status.state !== 'open' && (
        <p role="status" className="flex gap-3 border border-mustard/50 bg-mustard/10 p-4 text-sm text-bone">
          <TriangleAlert aria-hidden="true" className="size-5 shrink-0 text-mustard" />
          <span>
            <strong className="text-mustard">{status.label}.</strong> A rendelésed leadhatod most is, nyitás után
            dolgozzuk fel. {status.detail}.
          </span>
        </p>
      )}

      <FormBlock step="1" title="Elérhetőség">
        <FormField label="Név" error={errors.name} required>
          <input {...fieldProps('name')} type="text" autoComplete="name" className={inputClasses} />
        </FormField>
        <FormField label="Telefonszám" error={errors.phone} hint="Pl. 06 30 123 4567 – ezen hív a futár" required>
          <input
            {...fieldProps('phone')}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="06 30 123 4567"
            className={inputClasses}
          />
        </FormField>
      </FormBlock>

      <FormBlock step="2" title="Szállítás">
        <FormField label="Település" error={errors.town} required>
          <select {...fieldProps('town')} className={inputClasses}>
            <option value="" disabled>
              Válassz települést…
            </option>
            {businessInfo.delivery.areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
            <option value={OTHER_TOWN}>Másik település</option>
          </select>
        </FormField>

        {form.isUndeliverable && (
          <p role="alert" className="flex gap-3 border border-signal/60 bg-signal/10 p-4 text-sm text-bone">
            <TriangleAlert aria-hidden="true" className="size-5 shrink-0 text-signal" />
            <span>
              Sajnos oda nem szállítunk – csak {businessInfo.delivery.areas.join(', ')} területére. Személyesen
              átveheted nálunk: <strong>{businessInfo.address.full}</strong>, vagy hívj:{' '}
              <a href={businessInfo.phone.href} className="font-semibold text-mustard underline">
                {businessInfo.phone.display}
              </a>
              .
            </span>
          </p>
        )}

        <FormField label="Utca, házszám" error={errors.address} hint="Emelet, ajtó, kapukód is jöhet" required>
          <input
            {...fieldProps('address')}
            type="text"
            autoComplete="street-address"
            placeholder="Pl. Fő utca 12."
            className={inputClasses}
          />
        </FormField>

        <FormField label="Megjegyzés" hint="Allergia, extra kérés, csengő neve – bármi, ami segít">
          <textarea {...fieldProps('note')} rows={3} maxLength={500} className={`${inputClasses} resize-y`} />
        </FormField>
      </FormBlock>

      <FormBlock step="3" title="Fizetés">
        <div role="radiogroup" aria-label="Fizetési mód" className="grid gap-3 sm:grid-cols-2">
          {PAYMENT_METHODS.map(({ value, label }) => {
            const Icon = PAYMENT_ICONS[value];
            const checked = values.paymentMethod === value;
            return (
              <label
                key={value}
                className={`relative flex cursor-pointer items-center gap-3 border p-4 transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-mustard ${
                  checked ? 'border-mustard bg-mustard/10 text-bone' : 'border-steel bg-ink text-bone/80 hover:border-bone/40'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={value}
                  checked={checked}
                  onChange={form.handleChange}
                  className="sr-only"
                />
                <Icon aria-hidden="true" className={`size-6 ${checked ? 'text-mustard' : 'text-ash'}`} />
                <span className="font-condensed text-lg font-semibold uppercase tracking-wide">{label}</span>
              </label>
            );
          })}
        </div>
        <p className="text-sm text-ash">Online fizetés jelenleg nincs – a futárnál fizethetsz.</p>
      </FormBlock>

      {form.submitError && (
        <p role="alert" className="border border-signal/60 bg-signal/10 p-4 text-sm">
          {form.submitError}
        </p>
      )}

      <Button type="submit" size="lg" disabled={form.isSubmitting || form.isUndeliverable}>
        {form.isSubmitting && <Loader2 aria-hidden="true" className="size-5 animate-spin" />}
        {form.isSubmitting ? 'Rendelés küldése…' : 'Rendelés leadása'}
      </Button>
    </form>
  );
}
