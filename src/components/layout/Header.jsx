import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { businessInfo } from '../../data/businessInfo';
import Button from '../common/Button';
import NeonWordmark from '../common/NeonWordmark';
import Navigation from './Navigation';
import CartButton from './CartButton';

const SCROLL_THRESHOLD_PX = 24;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Útvonalváltáskor a mobil menü bezárul
  useEffect(() => setIsMenuOpen(false), [location]);

  const closeMenu = () => setIsMenuOpen(false);
  const isSolid = isScrolled || isMenuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        isSolid ? 'border-b border-steel bg-ink/92 backdrop-blur-md' : 'bg-gradient-to-b from-ink/80 to-transparent'
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label={`${businessInfo.name} – kezdőlap`} onClick={closeMenu}>
          <NeonWordmark size="sm" />
        </Link>

        <Navigation className="hidden lg:block" />

        <div className="flex items-center gap-1 sm:gap-3">
          <CartButton />
          <Button to="/rendeles" size="sm" className="hidden sm:inline-flex">
            Rendelés
          </Button>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Menü bezárása' : 'Menü megnyitása'}
            className="grid size-11 place-items-center text-bone lg:hidden"
          >
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" className="h-[calc(100svh-4.5rem)] overflow-y-auto border-t border-steel bg-ink px-5 pb-10 lg:hidden">
          <Navigation orientation="vertical" onNavigate={closeMenu} />
          <Button to="/rendeles" size="lg" className="mt-8 w-full" onClick={closeMenu}>
            Rendelés most
          </Button>
          <a href={businessInfo.phone.href} className="mt-6 block text-center font-condensed text-lg tracking-wider text-ash">
            vagy hívj: <span className="text-bone">{businessInfo.phone.display}</span>
          </a>
        </div>
      )}
    </header>
  );
}
