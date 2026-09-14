import { Info } from 'lucide-react';
import { getCategoryAnchorId } from './CategoryTabs';
import MenuItemCard from './MenuItemCard';
import MenuItemRow from './MenuItemRow';

const LAYOUTS = {
  cards: { list: 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3', Item: MenuItemCard },
  list: { list: 'grid gap-x-10 border-t border-steel md:grid-cols-2', Item: MenuItemRow },
};

export default function MenuCategory({ category, index }) {
  const { list, Item } = LAYOUTS[category.layout];
  const headingId = `${getCategoryAnchorId(category.id)}-cim`;

  return (
    <section id={getCategoryAnchorId(category.id)} aria-labelledby={headingId} className="scroll-mt-36">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b-2 border-bone pb-3">
        <div className="flex items-end gap-4">
          <span aria-hidden="true" className="font-display text-5xl leading-none text-steel">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <h3 id={headingId} className="font-display text-4xl leading-none tracking-wide sm:text-5xl">
              {category.title}
            </h3>
            {category.tagline && <p className="mt-1 text-sm text-ash">{category.tagline}</p>}
          </div>
        </div>

        {category.note && (
          <p className="flex items-center gap-2 bg-mustard/10 px-3 py-1.5 text-sm text-mustard">
            <Info aria-hidden="true" className="size-4 shrink-0" />
            {category.note}
          </p>
        )}
      </header>

      <ul className={list}>
        {category.items.map((item) => (
          <li key={item.id}>
            <Item item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}
