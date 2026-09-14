import { useAddToCart } from '../../hooks/useAddToCart';
import { formatPrice } from '../../utils/formatPrice';
import AddToCartButton from './AddToCartButton';
import ItemOptionsModal from './ItemOptionsModal';

/** Tömör, "árlap" jellegű sor a kisebb tételekhez (köretek, szószok, italok). */
export default function MenuItemRow({ item }) {
  const { requestAdd, confirmConfiguredAdd, isConfiguring, cancelConfiguring, justAdded } = useAddToCart(item);
  const priceLabel = item.unit ? `${formatPrice(item.price)}/${item.unit}` : formatPrice(item.price);

  return (
    <article className="flex items-center gap-4 border-b border-steel py-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-3">
          <h4 className="font-condensed text-xl font-semibold uppercase tracking-wide">{item.name}</h4>
          <span aria-hidden="true" className="mb-1 hidden flex-1 border-b border-dotted border-steel sm:block" />
          <p className="shrink-0 font-display text-2xl tracking-wide text-mustard">{priceLabel}</p>
        </div>
        {item.description && <p className="mt-0.5 text-sm text-ash">{item.description}</p>}
      </div>

      <AddToCartButton itemName={item.name} justAdded={justAdded} onClick={requestAdd} compact />

      {isConfiguring && (
        <ItemOptionsModal item={item} isOpen onClose={cancelConfiguring} onConfirm={confirmConfiguredAdd} />
      )}
    </article>
  );
}
