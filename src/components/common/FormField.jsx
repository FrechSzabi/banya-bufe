import { cloneElement, useId } from 'react';

/**
 * Címke + beviteli mező + hibaüzenet, akadálymentes összekötéssel.
 * A `children` egyetlen input / select / textarea elem.
 */
export default function FormField({ label, error, hint, required = false, children }) {
  const id = useId();
  const messageId = `${id}-message`;
  const hasMessage = Boolean(error || hint);

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-condensed text-sm font-semibold uppercase tracking-widest text-bone/85">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-mustard">
            *
          </span>
        )}
      </label>

      {cloneElement(children, {
        id,
        required,
        'aria-invalid': Boolean(error),
        'aria-describedby': hasMessage ? messageId : undefined,
      })}

      {hasMessage && (
        <p id={messageId} className={`text-sm ${error ? 'text-signal' : 'text-ash'}`}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
}

export const inputClasses =
  'w-full border border-steel bg-ink px-3.5 py-3 text-base text-bone placeholder:text-ash/60 transition focus:border-mustard focus:outline-none aria-[invalid=true]:border-signal';
