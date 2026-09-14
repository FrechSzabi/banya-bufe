import { useId } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useDialog } from '../../hooks/useDialog';

const PLACEMENTS = {
  // Mobilon alulról felcsúszó lap, nagyobb képernyőn középre igazított ablak
  center: {
    wrapper: 'items-end sm:items-center justify-center sm:p-6',
    panel: 'max-h-[92svh] w-full sm:max-w-lg border-t-4 sm:border-4 border-mustard',
  },
  // Oldalsó panel (kosár drawer)
  right: {
    wrapper: 'justify-end',
    panel: 'h-full w-full max-w-md border-l-4 border-mustard',
  },
};

export default function Modal({ isOpen, onClose, title, subtitle, placement = 'center', footer, children }) {
  const panelRef = useDialog(isOpen, onClose);
  const titleId = useId();

  if (!isOpen) return null;

  const { wrapper, panel } = PLACEMENTS[placement];

  return createPortal(
    <div className={`fixed inset-0 z-50 flex ${wrapper}`}>
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`relative flex flex-col bg-coal corrugated shadow-2xl outline-none ${panel}`}
      >
        <header className="flex items-start justify-between gap-4 border-b border-steel px-5 py-4">
          <div>
            <h2 id={titleId} className="font-display text-3xl leading-none tracking-wide text-bone">
              {title}
            </h2>
            {subtitle && <p className="mt-1 text-sm text-ash">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Bezárás"
            className="-mr-2 grid size-10 shrink-0 place-items-center text-bone/70 transition hover:text-mustard"
          >
            <X aria-hidden="true" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>

        {footer && <footer className="border-t border-steel bg-ink/60 px-5 py-4">{footer}</footer>}
      </div>
    </div>,
    document.body,
  );
}
