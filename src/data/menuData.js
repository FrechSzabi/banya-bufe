/**
 * A Bánya Büfé étlapja – az étlap fotók alapján, pontos árakkal (Ft).
 *
 * Minden tétel mezői:
 *  - id          egyedi azonosító (kosár kulcs)
 *  - name        megjelenített név
 *  - description összetevők / rövid leírás
 *  - price       önálló ár
 *  - menuPrice   (opcionális) ár menüben: választható körettel és szósszal
 *  - category    a kategória azonosítója (automatikusan kerül rá)
 *  - variants    (opcionális) választandó ízek / fajták, azonos áron
 *  - unit        (opcionális) mértékegység a ár mellé, pl. "db"
 *  - tags        (opcionális) címkék, pl. "vega", "gyerek"
 *
 * Az étlapon a gyrosok és a köretek mellett nem szerepel összetevőlista,
 * ezeknél a leírás szándékosan rövid.
 * TODO: pontos összetevőket egyeztetni a tulajdonossal.
 */

const createCategory = ({ items, ...category }) => ({
  ...category,
  items: items.map((item) => ({ ...item, category: category.id })),
});

export const CATEGORY_IDS = {
  burgers: 'hamburgerek',
  gyros: 'gyrosok',
  fried: 'frissensultek',
  salads: 'salatak',
  sides: 'koretek',
  desserts: 'desszertek',
  sauces: 'szoszok',
  extras: 'extrak',
  drinks: 'uditok',
};

export const menuCategories = [
  createCategory({
    id: CATEGORY_IDS.burgers,
    title: 'Hamburgerek',
    tagline: '160 g-os húspogácsa, frissen sütve',
    note: 'Menüben: választható körettel és szósszal. Édesburgonya +300 Ft.',
    layout: 'cards',
    items: [
      {
        id: 'marha-burger',
        name: 'Marha burger',
        description: '160 g 100% marhahús, jégsaláta, lilahagyma, paradicsom, cheddar, házi szósz',
        price: 3190,
        menuPrice: 4190,
      },
      {
        id: 'gyros-burger',
        name: 'Gyros burger',
        description: 'Gyroshús, lilakáposzta, jégsaláta, uborka, paradicsom, cheddar, házi szósz',
        price: 2890,
        menuPrice: 3890,
      },
      {
        id: 'banya-burger',
        name: 'Bánya burger',
        description:
          '160 g 100% marhahús, bacon, jégsaláta, jalapeno, paradicsom, rántott hagymakarika, cheddar, házi szósz',
        price: 3990,
        menuPrice: 4990,
        tags: ['A ház kedvence'],
      },
      {
        id: 'bbq-pulled-pork-burger',
        name: 'BBQ Pulled Pork burger',
        description: '160 g sertéshús, lilakáposzta, jégsaláta, csemegeuborka, cheddar, BBQ szósz',
        price: 2890,
        menuPrice: 3890,
      },
      {
        id: 'retro-burger',
        name: 'Retro burger',
        description:
          '160 g 100% marhahús, jégsaláta, lilahagyma, csemegeuborka, csalamádé, cheddar, ketchup, mustár',
        price: 3190,
        menuPrice: 4190,
      },
    ],
  }),

  createCategory({
    id: CATEGORY_IDS.gyros,
    title: 'Gyrosok',
    tagline: 'Pitában, tálon vagy dobozban',
    layout: 'cards',
    items: [
      { id: 'gyros-pita', name: 'Gyros pita', description: 'Gyroshús pitában', price: 1800 },
      {
        id: 'gyros-pita-cheddaros',
        name: 'Gyros pita cheddaros',
        description: 'Gyroshús pitában, cheddarral',
        price: 2000,
      },
      { id: 'gyros-tal', name: 'Gyros tál', description: 'Gyroshús tálon', price: 3090 },
      {
        id: 'gyros-tal-cheddaros',
        name: 'Gyros tál cheddaros',
        description: 'Gyroshús tálon, cheddarral',
        price: 3490,
      },
      {
        id: 'gyros-tal-dupla-hussal',
        name: 'Gyros tál dupla hússal',
        description: 'Gyros tál dupla adag hússal',
        price: 3690,
        tags: ['Nagy étvágyra'],
      },
      { id: 'gyros-box', name: 'Gyros box', description: 'Gyroshús dobozban, útközbenre', price: 2390 },
      {
        id: 'gyros-box-cheddaros',
        name: 'Gyros box cheddaros',
        description: 'Gyroshús dobozban, cheddarral',
        price: 2590,
      },
      { id: 'falafel-pita', name: 'Falafel pita', description: 'Falafel pitában', price: 1690, tags: ['Vega'] },
      { id: 'falafel-tal', name: 'Falafel tál', description: 'Falafel tálon', price: 2690, tags: ['Vega'] },
    ],
  }),

  createCategory({
    id: CATEGORY_IDS.fried,
    title: 'Frissensültek',
    tagline: 'Rendelésre sütjük, ropogósan',
    layout: 'cards',
    items: [
      { id: 'rantott-szelet', name: 'Rántott szelet', description: 'Sertéskaraj', price: 2690 },
      {
        id: 'cordon-bleu',
        name: 'Cordon bleu',
        description: 'Töltött sertéskaraj, cheddar, sonka',
        price: 3490,
      },
      {
        id: 'banya-borda',
        name: 'Bánya borda',
        description: 'Töltött sertéskaraj, füstölt tarja, lilahagyma, jalapeno, cheddar',
        price: 3790,
        tags: ['A ház kedvence'],
      },
      { id: 'rantott-sajt', name: 'Rántott sajt', description: 'Trappista, tartármártás', price: 3290 },
      { id: 'csirke-nuggets', name: 'Csirke nuggets', description: 'Gyerek adag', price: 1790, tags: ['Gyerek'] },
    ],
  }),

  createCategory({
    id: CATEGORY_IDS.salads,
    title: 'Saláták',
    tagline: 'Könnyebb, de nem kevesebb',
    layout: 'cards',
    items: [
      {
        id: 'gorog-salata-pitaval',
        name: 'Görögsaláta, pitával',
        description: 'Paradicsom, lilahagyma, uborka, olívabogyó, feta',
        price: 2590,
        tags: ['Vega'],
      },
      {
        id: 'banya-salata',
        name: 'Bánya saláta',
        description: 'Jégsaláta, paradicsom, lilahagyma, házi öntet, gyroshús',
        price: 3090,
      },
    ],
  }),

  createCategory({
    id: CATEGORY_IDS.sides,
    title: 'Köretek',
    tagline: 'Mellé',
    layout: 'list',
    items: [
      { id: 'rizs', name: 'Rizs', description: '', price: 850 },
      { id: 'hasabburgonya', name: 'Hasábburgonya', description: '', price: 990 },
      { id: 'steakburgonya', name: 'Steakburgonya', description: '', price: 990 },
      { id: 'edesburgonya', name: 'Édesburgonya', description: '', price: 1300 },
      { id: 'rantott-hagymakarika', name: 'Rántott hagymakarika', description: '', price: 1090 },
    ],
  }),

  createCategory({
    id: CATEGORY_IDS.desserts,
    title: 'Desszertek',
    tagline: 'A végére',
    layout: 'list',
    items: [
      { id: 'baklava', name: 'Baklava', description: '', price: 990 },
      {
        id: 'palacsinta',
        name: 'Palacsinta',
        description: 'Kakaós, lekváros vagy nutellás',
        price: 400,
        unit: 'db',
        variants: ['Kakaós', 'Lekváros', 'Nutellás'],
      },
    ],
  }),

  createCategory({
    id: CATEGORY_IDS.sauces,
    title: 'Szószok',
    tagline: 'Külön adagban',
    layout: 'list',
    items: [
      { id: 'szosz-ketchup', name: 'Ketchup', description: '', price: 400 },
      { id: 'szosz-majonez', name: 'Majonéz', description: '', price: 400 },
      { id: 'szosz-tartarmartas', name: 'Tartármártás', description: '', price: 400 },
      { id: 'szosz-hazi-hamburgerszosz', name: 'Házi hamburgerszósz', description: '', price: 400 },
      { id: 'szosz-cheddar', name: 'Cheddar szósz', description: '', price: 400 },
      { id: 'szosz-bbq', name: 'BBQ', description: '', price: 400 },
    ],
  }),

  createCategory({
    id: CATEGORY_IDS.extras,
    title: 'Extrák',
    tagline: 'Dobd fel a kajád',
    layout: 'list',
    items: [
      { id: 'extra-hamburgerhus', name: 'Hamburgerhús', description: '', price: 1100 },
      { id: 'extra-bacon', name: 'Bacon', description: '', price: 300 },
      { id: 'extra-jalapeno', name: 'Jalapeno', description: '', price: 200 },
      { id: 'extra-cheddar', name: 'Cheddar', description: '', price: 300 },
      { id: 'extra-feta', name: 'Feta', description: '', price: 300 },
    ],
  }),

  createCategory({
    id: CATEGORY_IDS.drinks,
    title: 'Üdítők',
    tagline: 'Hidegen',
    layout: 'list',
    items: [
      {
        id: 'szensavas-033',
        name: '0,33 l szénsavas üdítők',
        description: 'Coca Cola, Coca Cola Zero, Fanta, Sprite',
        price: 500,
        variants: ['Coca Cola', 'Coca Cola Zero', 'Fanta', 'Sprite'],
      },
      {
        id: 'cappy-033',
        name: '0,33 l Cappy',
        description: '100% narancs, alma',
        price: 600,
        variants: ['Narancs (100%)', 'Alma (100%)'],
      },
      {
        id: 'naturaqua-05',
        name: '0,5 l NaturAqua',
        description: 'Szénsavas vagy mentes',
        price: 500,
        variants: ['Szénsavas', 'Mentes'],
      },
      {
        id: 'hell-025',
        name: '0,25 l Hell',
        description: 'Classic, Zero',
        price: 500,
        variants: ['Classic', 'Zero'],
      },
      {
        id: 'szensavas-jeges-tea-05',
        name: '0,5 l szénsavas üdítők, jeges teák',
        description:
          'Coca Cola, Coca Cola Zero, Fanta, Fanta bodza, Sprite Zero, Kinley gyömbér, tonic, Fuze tea citrom, barack',
        price: 690,
        variants: [
          'Coca Cola',
          'Coca Cola Zero',
          'Fanta',
          'Fanta bodza',
          'Sprite Zero',
          'Kinley gyömbér',
          'Tonic',
          'Fuze Tea citrom',
          'Fuze Tea barack',
        ],
      },
    ],
  }),
];

const findCategory = (categoryId) => menuCategories.find((category) => category.id === categoryId);
const pickItems = (categoryId, itemIds) =>
  findCategory(categoryId).items.filter((item) => itemIds.includes(item.id));

/** Azon kategóriák, amelyek tételeihez extrák és szószok adhatók. */
const ADDON_ELIGIBLE_CATEGORIES = new Set([
  CATEGORY_IDS.burgers,
  CATEGORY_IDS.gyros,
  CATEGORY_IDS.fried,
  CATEGORY_IDS.salads,
]);

/**
 * Menü opció (hamburgereknél): választható köret + szósz.
 * TODO: egyeztetni, pontosan mely köretek választhatók menübe.
 */
export const menuOption = {
  sides: pickItems(CATEGORY_IDS.sides, ['hasabburgonya', 'steakburgonya', 'edesburgonya']).map((side) => ({
    id: side.id,
    name: side.name,
    surcharge: side.id === 'edesburgonya' ? 300 : 0,
  })),
  sauces: findCategory(CATEGORY_IDS.sauces).items.map(({ id, name }) => ({ id, name })),
};

export const addonGroups = {
  extras: findCategory(CATEGORY_IDS.extras).items,
  sauces: findCategory(CATEGORY_IDS.sauces).items,
};

export const allowsAddons = (item) => ADDON_ELIGIBLE_CATEGORIES.has(item.category);
export const hasMenuOption = (item) => typeof item.menuPrice === 'number';
export const hasVariants = (item) => Array.isArray(item.variants) && item.variants.length > 0;
export const needsConfiguration = (item) => allowsAddons(item) || hasMenuOption(item) || hasVariants(item);
