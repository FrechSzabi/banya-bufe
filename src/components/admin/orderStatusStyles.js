/** Állapotonkénti színek az admin felületen (badge, oszlopfejléc, kiválasztott gomb). */
export const STATUS_STYLES = {
  new: {
    badge: 'border border-signal/60 bg-signal/15 text-signal',
    accent: 'border-t-signal',
    selected: 'border-signal bg-signal text-ink',
  },
  ready: {
    badge: 'border border-mustard/60 bg-mustard/10 text-mustard',
    accent: 'border-t-mustard',
    selected: 'border-mustard bg-mustard text-ink',
  },
  delivering: {
    badge: 'border border-bone/50 bg-bone/10 text-bone',
    accent: 'border-t-bone',
    selected: 'border-bone bg-bone text-ink',
  },
  completed: {
    badge: 'border border-go/50 bg-go/10 text-go',
    accent: 'border-t-go',
    selected: 'border-go bg-go text-ink',
  },
  cancelled: {
    badge: 'border border-ash/50 bg-ash/10 text-ash',
    accent: 'border-t-ash',
    selected: 'border-ash bg-ash text-ink',
  },
};
