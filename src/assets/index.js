/**
 * Helyszín fotók betöltése.
 *
 * A fotókat a `src/assets/photos/` mappába kell másolni az alábbi
 * fájlnevekkel (a kiterjesztés lehet jpg, jpeg, png, webp vagy avif):
 *   - kontener-homlokzat  → a konténer + neon felirat + terasz (hero kép)
 *   - terasz              → a terasz asztalai a konténer mellett
 *   - logo                → a kör alakú Bánya Büfé logó
 *
 * Ha egy fájl hiányzik, a komponensek csíkos, brandelt placeholdert
 * jelenítenek meg, így a build sosem törik el.
 */
const photoModules = import.meta.glob('./photos/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
});

const findPhoto = (baseName) => {
  const match = Object.keys(photoModules).find((path) => path.includes(`/${baseName}.`));
  return match ? photoModules[match] : null;
};

export const photos = {
  containerFront: findPhoto('kontener-homlokzat'),
  terrace: findPhoto('terasz'),
  logo: findPhoto('logo'),
};
