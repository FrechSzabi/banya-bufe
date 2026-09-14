import { businessInfo } from '../../data/businessInfo';
import { useOpeningStatus } from '../../hooks/useOpeningStatus';
import Badge from '../common/Badge';
import SectionHeading from '../common/SectionHeading';

export default function Hours() {
  const status = useOpeningStatus();

  return (
    <section id="nyitvatartas" aria-labelledby="nyitvatartas-cim" className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            id="nyitvatartas-cim"
            eyebrow="Nyitvatartás"
            title={
              <>
                Hétköznap
                <br />
                <span className="text-mustard">11–19</span>
              </>
            }
            description="Hétvégén pihen a sütő. Rendelést nyitvatartási időben tudunk kiszállítani."
          />
          <div className="mt-6 flex flex-wrap items-center gap-3" aria-live="polite">
            <Badge tone={status.state} withDot>
              {status.label}
            </Badge>
            <span className="text-sm text-ash">{status.detail}</span>
          </div>
        </div>

        <div className="border border-steel bg-coal">
          <table className="w-full text-left">
            <caption className="sr-only">Heti nyitvatartás</caption>
            <thead>
              <tr className="border-b border-steel font-condensed text-xs uppercase tracking-[0.25em] text-ash">
                <th scope="col" className="px-5 py-3 font-semibold">
                  Nap
                </th>
                <th scope="col" className="px-5 py-3 text-right font-semibold">
                  Időpont
                </th>
              </tr>
            </thead>
            <tbody>
              {businessInfo.openingHours.map(({ day, label, open, close }) => {
                const isToday = day === status.today;
                return (
                  <tr
                    key={day}
                    aria-current={isToday ? 'date' : undefined}
                    className={`border-b border-steel/60 last:border-0 ${isToday ? 'bg-mustard/10' : ''}`}
                  >
                    <th
                      scope="row"
                      className={`relative px-5 py-4 font-condensed text-xl font-semibold uppercase tracking-wider ${
                        isToday ? 'text-mustard' : 'text-bone'
                      }`}
                    >
                      {isToday && <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-mustard" />}
                      {label}
                      {isToday && <span className="ml-3 align-middle text-xs tracking-[0.2em] text-mustard/80">ma</span>}
                    </th>
                    <td
                      className={`px-5 py-4 text-right font-display text-2xl tracking-wide tabular-nums ${
                        open ? 'text-bone' : 'text-ash/70'
                      }`}
                    >
                      {open ? `${open} – ${close}` : 'Zárva'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
