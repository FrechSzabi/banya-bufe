import { photos } from '../../assets';
import PhotoFrame from '../common/PhotoFrame';

/** Aszimmetrikus, egymásra csúsztatott fotó kollázs. */
export default function Gallery() {
  return (
    <div className="relative grid grid-cols-6 grid-rows-[auto_auto] gap-3 sm:gap-4">
      <figure className="col-span-4 row-span-2">
        <PhotoFrame
          src={photos.containerFront}
          alt="A konténer büfé fekete-fehér csíkos homlokzata és a neon Bánya Büfé felirat"
          className="aspect-[3/4] border-4 border-bone shadow-[10px_10px_0_var(--color-mustard)]"
        />
      </figure>

      <figure className="col-span-2 mt-10 sm:mt-16">
        <PhotoFrame
          src={photos.terrace}
          alt="Fekete asztalok és székek a büfé kavicsos teraszán, háttérben erdős domboldal"
          className="aspect-[3/4] rotate-3 border-4 border-bone"
        />
      </figure>

      <figure className="col-span-2 flex items-start">
        {photos.logo ? (
          <img
            src={photos.logo}
            alt="A Bánya Büfé logója: hamburger és gyros"
            loading="lazy"
            className="aspect-square w-full -rotate-6 rounded-full bg-bone object-contain p-1"
          />
        ) : (
          <div className="grid aspect-square w-full -rotate-6 place-items-center rounded-full border-2 border-mustard bg-ink text-center font-display text-2xl leading-none tracking-wide glow-mustard sm:text-3xl">
            <span>
              <span className="neon-white">Est.</span>
              <br />
              <span className="neon-mustard">Csaba</span>
            </span>
          </div>
        )}
      </figure>
    </div>
  );
}
