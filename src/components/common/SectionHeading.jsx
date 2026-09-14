export default function SectionHeading({ id, eyebrow, title, description, align = 'left', className = '' }) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <header className={`flex flex-col gap-3 ${alignment} ${className}`}>
      {eyebrow && (
        <p className="flex items-center gap-3 font-condensed text-sm font-semibold uppercase tracking-[0.3em] text-mustard">
          <span aria-hidden="true" className="hazard inline-block h-2.5 w-10" />
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="font-display text-5xl leading-[0.9] tracking-wide text-bone sm:text-6xl lg:text-7xl">
        {title}
      </h2>
      {description && <p className="max-w-xl text-base text-ash sm:text-lg">{description}</p>}
    </header>
  );
}
