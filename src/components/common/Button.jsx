import { Link } from 'react-router';

const BASE =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-condensed font-semibold uppercase tracking-wider transition duration-200 disabled:cursor-not-allowed disabled:opacity-45';

const VARIANTS = {
  primary:
    'bg-mustard text-ink glow-mustard hover:bg-[#ffd548] hover:shadow-[0_0_0_1px_#f4c430,0_0_26px_rgb(244_196_48/0.55),0_0_60px_rgb(244_196_48/0.25)] active:translate-y-px',
  outline: 'border border-bone/70 text-bone hover:border-mustard hover:text-mustard',
  ghost: 'text-bone/80 hover:text-mustard',
  dark: 'bg-graphite text-bone border border-steel hover:border-mustard/70',
};

const SIZES = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-base',
  lg: 'h-14 px-7 text-lg',
  icon: 'h-11 w-11',
};

/**
 * Egységes gomb: `to` → router Link, `href` → sima link, egyébként <button>.
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  type = 'button',
  children,
  ...rest
}) {
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
