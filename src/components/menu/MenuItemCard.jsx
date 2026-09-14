import { hasMenuOption } from '../../data/menuData';
import { useAddToCart } from '../../hooks/useAddToCart';
import { formatPrice } from '../../utils/formatPrice';
import Badge from '../common/Badge';
import AddToCartButton from './AddToCartButton';
import ItemOptionsModal from './ItemOptionsModal';

export default function MenuItemCard({ item }) {
  const { requestAdd, confirmConfiguredAdd, isConfiguring, cancelConfiguring, justAdded } = useAddToCart(item);

  return (
    <article className="group relative flex h-full flex-col border border-steel bg-coal corrugated p-5 transition hover:-translate-y-0.5 hover:border-mustard/60">
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-1 w-0 bg-mustard transition-all duration-300 group-hover:w-full"
      />

      {item.tags && (
        <div className="mb-3 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <Badge key={tag} tone="outline">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <h4 className="font-condensed text-2xl font-bold uppercase leading-tight tracking-wide">{item.name}</h4>
      {item.description && <p className="mt-2 flex-1 text-sm leading-relaxed text-ash">{item.description}</p>}

      <div className="mt-5 flex items-end justify-between gap-3 border-t border-dashed border-steel pt-4">
        <div>
          <p className="font-display text-3xl leading-none tracking-wide text-mustard">{formatPrice(item.price)}</p>
          {hasMenuOption(item) && (
            <p className="mt-1 text-sm text-bone/80">
              Menüben: <span className="font-semibold text-bone">{formatPrice(item.menuPrice)}</span>
            </p>
          )}
        </div>
        <AddToCartButton itemName={item.name} justAdded={justAdded} onClick={requestAdd} />
      </div>

      {isConfiguring && (
        <ItemOptionsModal item={item} isOpen onClose={cancelConfiguring} onConfirm={confirmConfiguredAdd} />
      )}
    </article>
  );
}
