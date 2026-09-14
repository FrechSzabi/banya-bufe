export const getCategoryAnchorId = (categoryId) => `kategoria-${categoryId}`;

const scrollToCategory = (categoryId) =>
  document.getElementById(getCategoryAnchorId(categoryId))?.scrollIntoView({ behavior: 'smooth' });

/** Ragadós, vízszintesen görgethető kategória-választó (mobilon is kényelmes). */
export default function CategoryTabs({ categories }) {
  return (
    <nav
      aria-label="Étlap kategóriák"
      className="sticky top-18 z-30 -mx-4 mt-10 border-y border-steel bg-ink/92 backdrop-blur-md sm:-mx-6 lg:-mx-8"
    >
      <ul className="flex gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none] sm:px-6 lg:px-8">
        {categories.map((category) => (
          <li key={category.id} className="shrink-0">
            <button
              type="button"
              onClick={() => scrollToCategory(category.id)}
              className="h-10 px-3 font-condensed text-base font-semibold uppercase tracking-wider text-bone/75 transition hover:bg-mustard hover:text-ink"
            >
              {category.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
