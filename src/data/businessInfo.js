/**
 * A Bánya Büfé üzleti adatai – egyetlen forrás, bárhonnan importálható.
 */
export const businessInfo = {
  name: 'Bánya Büfé',
  slogan: 'Gyros, burger, frissensült. A Pilis lábánál, konténerből, tűzforrón.',

  address: {
    street: 'Feketefenyő u. 1',
    city: 'Piliscsaba',
    zip: '2081',
    landmark: 'Az Aldi és a Mol kút mellett',
    full: '2081 Piliscsaba, Feketefenyő u. 1',
  },

  map: {
    // TODO: a pontos GPS koordinátákat (lat/lng) kell ide beírni, és a
    // LocationMap komponens ezek alapján készít majd pontos térképet.
    coordinates: null,
    query: 'Bánya Büfé, 2081 Piliscsaba, Feketefenyő u. 1',
  },

  phone: {
    display: '06 30 238 8066',
    href: 'tel:+36302388066',
  },

  social: {
    facebook: {
      label: 'Bánya Büfé Piliscsaba',
      url: 'https://www.facebook.com/banyabufepiliscsaba',
    },
  },

  /** day: a JS Date#getDay() szerinti index (0 = vasárnap). null = zárva. */
  openingHours: [
    { day: 1, label: 'Hétfő', open: '11:00', close: '19:00' },
    { day: 2, label: 'Kedd', open: '11:00', close: '19:00' },
    { day: 3, label: 'Szerda', open: '11:00', close: '19:00' },
    { day: 4, label: 'Csütörtök', open: '11:00', close: '19:00' },
    { day: 5, label: 'Péntek', open: '11:00', close: '19:00' },
    { day: 6, label: 'Szombat', open: null, close: null },
    { day: 0, label: 'Vasárnap', open: null, close: null },
  ],
  timeZone: 'Europe/Budapest',

  rating: {
    recommendPercent: 100,
    reviewCount: 8,
    source: 'Facebook',
  },

  priceRange: '$$',

  delivery: {
    areas: ['Jászfalu', 'Piliscsaba', 'Pilisvörösvár', 'Pilisszentiván'],
    // TODO: valós becsült szállítási időt és szállítási díjat egyeztetni.
    estimatedMinutes: { min: 40, max: 60 },
    fee: null,
  },

  /**
   * FIGYELEM: kitalált, placeholder vélemények!
   * TODO: élesítés előtt valós Google / Facebook véleményekre cserélni
   * (a szerző hozzájárulásával), vagy a blokkot eltávolítani.
   */
  reviews: [
    {
      id: 'placeholder-1',
      author: 'Vendég (placeholder)',
      text: 'A Bánya burger egyszerűen brutális, a hagymakarika benne telitalálat. Túra után kötelező megálló.',
    },
    {
      id: 'placeholder-2',
      author: 'Vendég (placeholder)',
      text: 'Gyors, kedves kiszolgálás, bőséges gyros tál. Jó, hogy végre van egy igazi büfé Csabán.',
    },
    {
      id: 'placeholder-3',
      author: 'Vendég (placeholder)',
      text: 'Pilisvörösvárra rendeltünk, forrón érkezett. A cordon bleu-t mindenkinek ajánlom.',
    },
  ],
};
