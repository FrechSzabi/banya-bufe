import { Quote, ThumbsUp } from 'lucide-react';
import { businessInfo } from '../../data/businessInfo';
import SectionHeading from '../common/SectionHeading';

const CARD_OFFSETS = ['lg:translate-y-0', 'lg:translate-y-10', 'lg:-translate-y-4'];

export default function Reviews() {
  const { rating, reviews } = businessInfo;

  return (
    <section aria-labelledby="velemenyek-cim" className="relative mt-28 overflow-hidden border-y border-steel bg-coal py-20">
      <div aria-hidden="true" className="stripes absolute -right-10 top-0 h-full w-40 rotate-6 opacity-[0.04]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.6fr] lg:px-8">
        <div>
          <SectionHeading id="velemenyek-cim" eyebrow="Vélemények" title="Ezt mondják rólunk" />

          <div className="mt-8 flex items-end gap-4">
            <p className="font-display text-[7rem] leading-[0.8] neon-mustard sm:text-[9rem]">{rating.recommendPercent}%</p>
            <ThumbsUp aria-hidden="true" className="mb-3 size-10 text-bone" />
          </div>
          <p className="mt-3 font-condensed text-xl uppercase tracking-wider text-bone">
            ajánlja · {rating.reviewCount} értékelés
          </p>
          <p className="text-sm text-ash">Forrás: {rating.source}</p>
        </div>

        {/*
          FIGYELEM: az alábbi idézetek kitalált placeholderek (businessInfo.reviews)!
          TODO: élesítés előtt valós Google / Facebook véleményekre cserélni.
        */}
        <ul className="grid gap-5 md:grid-cols-3">
          {reviews.map((review, index) => (
            <li key={review.id} className={CARD_OFFSETS[index % CARD_OFFSETS.length]}>
              <figure className="flex h-full flex-col border border-steel bg-ink p-6">
                <Quote aria-hidden="true" className="size-8 text-mustard" />
                <blockquote className="mt-4 flex-1 text-bone/90">„{review.text}”</blockquote>
                <figcaption className="mt-6 font-condensed text-sm uppercase tracking-widest text-ash">
                  — {review.author}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
