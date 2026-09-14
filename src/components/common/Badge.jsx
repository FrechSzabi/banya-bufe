const TONES = {
  mustard: 'bg-mustard text-ink',
  outline: 'border border-mustard/60 text-mustard',
  neutral: 'bg-steel text-bone/90',
  open: 'border border-go/50 bg-go/10 text-go',
  soon: 'border border-mustard/60 bg-mustard/10 text-mustard',
  closed: 'border border-signal/50 bg-signal/10 text-signal',
};

export default function Badge({ tone = 'neutral', withDot = false, className = '', children }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 font-condensed text-xs font-semibold uppercase tracking-widest ${TONES[tone]} ${className}`}
    >
      {withDot && <span aria-hidden="true" className="size-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]" />}
      {children}
    </span>
  );
}
