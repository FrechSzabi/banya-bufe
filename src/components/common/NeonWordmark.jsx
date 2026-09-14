const SIZES = {
  sm: 'text-[1.9rem] gap-2',
  xl: 'text-[clamp(4.5rem,19vw,11.5rem)] gap-x-5 sm:gap-x-8',
};

/**
 * A konténeren világító "BÁNYA BÜFÉ" neon felirat képi megfelelője.
 * `as` – a hero-ban h1, a headerben sima span.
 */
export default function NeonWordmark({ size = 'sm', as: Tag = 'span', flicker = false, className = '' }) {
  return (
    <Tag className={`flex flex-wrap items-baseline font-display leading-[0.82] tracking-wide ${SIZES[size]} ${className}`}>
      <span className="neon-white">Bánya</span>
      <span className={`neon-mustard ${flicker ? 'animate-flicker' : ''}`}>Büfé</span>
    </Tag>
  );
}
