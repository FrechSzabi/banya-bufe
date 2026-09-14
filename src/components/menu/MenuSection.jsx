import { menuCategories } from '../../data/menuData';
import SectionHeading from '../common/SectionHeading';
import CategoryTabs from './CategoryTabs';
import MenuCategory from './MenuCategory';

export default function MenuSection({
  eyebrow = 'Étlap',
  title = 'Mit ennél ma?',
  description = 'Válassz, testre szabhatod extrákkal és szószokkal, mi pedig forrón visszük.',
}) {
  return (
    <section id="etlap" aria-labelledby="etlap-cim" className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 lg:px-8">
      <SectionHeading id="etlap-cim" eyebrow={eyebrow} title={title} description={description} />

      <CategoryTabs categories={menuCategories} />

      <div className="mt-10 flex flex-col gap-20">
        {menuCategories.map((category, index) => (
          <MenuCategory key={category.id} category={category} index={index} />
        ))}
      </div>
    </section>
  );
}
