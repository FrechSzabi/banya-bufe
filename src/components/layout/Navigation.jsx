import { Link, useLocation } from 'react-router';
import { navigationLinks } from '../../data/navigation';

const ORIENTATIONS = {
  horizontal: {
    list: 'flex items-center gap-7',
    link: 'relative py-2 font-condensed text-[0.95rem] font-semibold uppercase tracking-[0.18em] text-bone/75 transition hover:text-mustard aria-[current=true]:text-mustard',
  },
  vertical: {
    list: 'flex flex-col',
    link: 'block border-b border-steel py-4 font-display text-4xl tracking-wide text-bone transition hover:text-mustard hover:pl-2 aria-[current=true]:text-mustard',
  },
};

export default function Navigation({ orientation = 'horizontal', onNavigate, className = '' }) {
  const { pathname, hash } = useLocation();
  const styles = ORIENTATIONS[orientation];
  const currentPath = `${pathname}${hash}`;

  return (
    <nav aria-label="Fő navigáció" className={className}>
      <ul className={styles.list}>
        {navigationLinks.map(({ label, to }) => (
          <li key={to}>
            <Link to={to} onClick={onNavigate} aria-current={currentPath === to} className={styles.link}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
