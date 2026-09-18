import { useState } from 'react';
import { Link } from 'react-router';
import { MapPin, Phone } from 'lucide-react';
import { businessInfo } from '../../data/businessInfo';
import { navigationLinks } from '../../data/navigation';
import { photos } from '../../assets';
import FacebookIcon from '../common/FacebookIcon';
import NeonWordmark from '../common/NeonWordmark';
import ImpressumModal from './ImpressumModal';

const FooterColumn = ({ title, children }) => (
  <div>
    <h3 className="mb-4 font-condensed text-sm font-semibold uppercase tracking-[0.25em] text-mustard">{title}</h3>
    {children}
  </div>
);

export default function Footer() {
  const [isImpressumOpen, setIsImpressumOpen] = useState(false);
  const { address, phone, social, openingHours } = businessInfo;
  const weekdayHours = openingHours.find((entry) => entry.open);

  return (
    <footer className="relative mt-24 bg-coal">
      <div aria-hidden="true" className="stripes h-3 opacity-90" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:px-8">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4">
            {photos.logo && <img src={photos.logo} alt="" className="size-16 rounded-full bg-bone" />}
            <NeonWordmark size="sm" />
          </div>
          <p className="max-w-xs text-ash">{businessInfo.slogan}</p>
          <a
            href={social.facebook.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 border border-steel px-3 py-2 text-sm text-bone transition hover:border-mustard hover:text-mustard"
          >
            <FacebookIcon />
            {social.facebook.label}
          </a>
        </div>

        <FooterColumn title="Gyors linkek">
          <ul className="flex flex-col gap-2">
            {navigationLinks.map(({ label, to }) => (
              <li key={to}>
                <Link to={to} className="text-bone/80 transition hover:text-mustard">
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/rendeles" className="text-bone/80 transition hover:text-mustard">
                Online rendelés
              </Link>
            </li>
          </ul>
        </FooterColumn>

        <FooterColumn title="Nyitvatartás">
          <dl className="flex flex-col gap-1 text-bone/80">
            <div className="flex justify-between gap-4">
              <dt>Hétfő – Péntek</dt>
              <dd className="tabular-nums">
                {weekdayHours.open} – {weekdayHours.close}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Szombat – Vasárnap</dt>
              <dd>Zárva</dd>
            </div>
          </dl>
        </FooterColumn>

        <FooterColumn title="Kapcsolat">
          <address className="flex flex-col gap-3 not-italic text-bone/80">
            <span className="flex gap-2">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-mustard" />
              <span>
                {address.full}
                <br />
                <span className="text-ash">{address.landmark}</span>
              </span>
            </span>
            <a href={phone.href} className="flex items-center gap-2 transition hover:text-mustard">
              <Phone aria-hidden="true" className="size-4 text-mustard" />
              {phone.display}
            </a>
          </address>
        </FooterColumn>
      </div>

      <div className="border-t border-steel">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-sm text-ash sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {businessInfo.name}. Minden jog fenntartva.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <p>
              Fejlesztette:{' '}
              <a
                href="https://sf-webdesign.hu"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-steel underline-offset-4 transition hover:text-mustard"
              >
                SF-Webdesign
              </a>
            </p>
            <button
              type="button"
              onClick={() => setIsImpressumOpen(true)}
              className="w-fit underline decoration-steel underline-offset-4 transition hover:text-mustard"
            >
              Impresszum
            </button>
          </div>
        </div>
      </div>

      <ImpressumModal isOpen={isImpressumOpen} onClose={() => setIsImpressumOpen(false)} />
    </footer>
  );
}
