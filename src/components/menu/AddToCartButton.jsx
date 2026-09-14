import { Check, Plus } from 'lucide-react';
import Button from '../common/Button';

export default function AddToCartButton({ itemName, justAdded, onClick, compact = false }) {
  if (compact) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={`${itemName} kosárba`}
        className={`grid size-10 shrink-0 place-items-center border transition ${
          justAdded
            ? 'border-go bg-go text-ink'
            : 'border-steel text-mustard hover:border-mustard hover:bg-mustard hover:text-ink'
        }`}
      >
        {justAdded ? <Check aria-hidden="true" className="size-5" /> : <Plus aria-hidden="true" className="size-5" />}
      </button>
    );
  }

  return (
    <Button
      size="sm"
      variant={justAdded ? 'dark' : 'primary'}
      onClick={onClick}
      aria-label={`${itemName} kosárba`}
      className={justAdded ? '!border-go !text-go' : ''}
    >
      {justAdded ? <Check aria-hidden="true" className="size-4" /> : <Plus aria-hidden="true" className="size-4" />}
      {justAdded ? 'Kosárban' : 'Kosárba'}
    </Button>
  );
}
