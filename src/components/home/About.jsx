import { Flame, Leaf, Truck } from 'lucide-react';
import { businessInfo } from '../../data/businessInfo';
import SectionHeading from '../common/SectionHeading';
import Gallery from './Gallery';

// TODO: a bemutatkozó szöveget a tulajdonos saját történetével pontosítani.
const HIGHLIGHTS = [
  { icon: Flame, title: 'Rendelésre sütjük', text: 'A húsok és a frissensültek akkor kerülnek a sütőbe, amikor megrendeled.' },
  { icon: Leaf, title: 'Vega is van', text: 'Falafel pita és tál, görögsaláta – mindenki talál magának valót.' },
  {
    icon: Truck,
    title: 'Házhoz visszük',
    text: `Kiszállítás: ${businessInfo.delivery.areas.join(', ')}.`,
  },
];

export default function About() {
  return (
    <section id="rolunk" aria-labelledby="rolunk-cim" className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 lg:px-8">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <SectionHeading
            id="rolunk-cim"
            eyebrow="Rólunk"
            title={
              <>
                Konténer.
                <br />
                Neon. <span className="text-mustard">Gyros.</span>
              </>
            }
          />

          <div className="mt-8 space-y-4 text-lg text-bone/85">
            <p>
              A Bánya Büfé egy csíkos konténerből nőtt ki Piliscsaba szélén, {businessInfo.address.landmark.toLowerCase()}.
              Nincs itt semmi flanc: kiadós burgerek, szaftos gyros és ropogós frissensültek, ahogy egy igazi büfében kell.
            </p>
            <p className="text-ash">
              Ugorj be munka vagy túra után, ülj ki a teraszra, vagy rendeld haza – a Pilis lábánál mindig forró a sütő.
            </p>
          </div>

          <ul className="mt-10 grid gap-px border border-steel bg-steel sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="bg-coal p-5">
                <Icon aria-hidden="true" className="size-6 text-mustard" />
                <h3 className="mt-3 font-condensed text-lg font-bold uppercase tracking-wider">{title}</h3>
                <p className="mt-1 text-sm text-ash">{text}</p>
              </li>
            ))}
          </ul>
        </div>

        <Gallery />
      </div>
    </section>
  );
}
