import { ExternalLink, MapPin, Phone, Truck } from 'lucide-react';
import { businessInfo } from '../../data/businessInfo';
import FacebookIcon from '../common/FacebookIcon';
import SectionHeading from '../common/SectionHeading';

/**
 * TODO: ha megvannak a pontos GPS koordináták (businessInfo.map.coordinates),
 * a térkép azok alapján készül – addig a cím alapján keres a Google Maps.
 */
const buildMapLocation = ({ coordinates, query }) =>
  encodeURIComponent(coordinates ? `${coordinates.lat},${coordinates.lng}` : query);

export default function LocationMap() {
  const { address, phone, social, delivery, map } = businessInfo;
  const location = buildMapLocation(map);

  return (
    <section id="kapcsolat" aria-labelledby="kapcsolat-cim" className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 lg:px-8">
      <SectionHeading id="kapcsolat-cim" eyebrow="Helyszín & kapcsolat" title="Itt találsz minket" />

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.3fr]">
        <div className="flex flex-col gap-px border border-steel bg-steel">
          <div className="bg-coal p-6">
            <h3 className="flex items-center gap-2 font-condensed text-sm font-semibold uppercase tracking-[0.25em] text-mustard">
              <MapPin aria-hidden="true" className="size-4" /> Cím
            </h3>
            <address className="mt-3 not-italic">
              <p className="font-display text-3xl leading-none tracking-wide">{address.street}</p>
              <p className="mt-1 text-lg text-bone/85">
                {address.zip} {address.city}
              </p>
              <p className="text-ash">{address.landmark}</p>
            </address>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${location}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-mustard underline-offset-4 hover:underline"
            >
              Útvonaltervezés <ExternalLink aria-hidden="true" className="size-4" />
            </a>
          </div>

          <div className="bg-coal p-6">
            <h3 className="flex items-center gap-2 font-condensed text-sm font-semibold uppercase tracking-[0.25em] text-mustard">
              <Phone aria-hidden="true" className="size-4" /> Telefon
            </h3>
            <a href={phone.href} className="mt-3 block font-display text-4xl tracking-wide transition hover:neon-mustard">
              {phone.display}
            </a>
            <a
              href={social.facebook.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-bone/80 transition hover:text-mustard"
            >
              <FacebookIcon /> {social.facebook.label}
            </a>
          </div>

          <div className="bg-coal p-6">
            <h3 className="flex items-center gap-2 font-condensed text-sm font-semibold uppercase tracking-[0.25em] text-mustard">
              <Truck aria-hidden="true" className="size-4" /> Kiszállítási terület
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {delivery.areas.map((area) => (
                <li key={area} className="border border-steel bg-ink px-3 py-1.5 font-condensed text-lg uppercase tracking-wider">
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative min-h-80 border-4 border-bone lg:min-h-full">
          <span className="hazard absolute -top-3 left-6 z-10 h-3 w-24" aria-hidden="true" />
          <iframe
            title={`${businessInfo.name} a térképen – ${address.full}`}
            src={`https://www.google.com/maps?q=${location}&z=16&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full grayscale-[0.85] invert-[0.9] hue-rotate-180 contrast-[0.9]"
          />
        </div>
      </div>
    </section>
  );
}
