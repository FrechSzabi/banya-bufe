import { ArrowRight, MapPin } from 'lucide-react';
import { businessInfo } from '../../data/businessInfo';
import { photos } from '../../assets';
import Button from '../common/Button';
import NeonWordmark from '../common/NeonWordmark';

export default function Hero() {
  return (
    <section aria-label="Bemutatkozás" className="relative isolate flex min-h-[92svh] items-end overflow-hidden pt-24">
      {photos.containerFront ? (
        <img
          src={photos.containerFront}
          alt="A Bánya Büfé csíkos konténere a neon felirattal és a terasz asztalaival Piliscsabán"
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]"
        />
      ) : (
        <div aria-hidden="true" className="stripes absolute inset-0 -z-20 opacity-[0.07]" />
      )}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/75 to-ink/30" />
      <div aria-hidden="true" className="absolute inset-y-0 left-0 -z-10 w-full bg-gradient-to-r from-ink/90 via-ink/50 to-transparent lg:w-2/3" />

      <div className="mx-auto w-full max-w-7xl px-4 pb-28 sm:px-6 sm:pb-32 lg:px-8">
        <p className="mb-6 inline-flex -rotate-2 items-center gap-2 bg-bone px-3 py-1.5 font-condensed text-sm font-bold uppercase tracking-[0.2em] text-ink shadow-[4px_4px_0_var(--color-mustard)]">
          <MapPin aria-hidden="true" className="size-4" />
          Street food · {businessInfo.address.city}
        </p>

        <NeonWordmark as="h1" size="xl" flicker />

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,34rem)_1fr] lg:items-end">
          <p className="max-w-lg border-l-4 border-mustard pl-4 text-lg text-bone/90 sm:text-xl">
            {businessInfo.slogan}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Button to="/rendeles" size="lg">
              Rendelés most
              <ArrowRight aria-hidden="true" className="size-5" />
            </Button>
            <Button to="/#etlap" size="lg" variant="outline" className="bg-ink/40 backdrop-blur-sm">
              Étlap megtekintése
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
