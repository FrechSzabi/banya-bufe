import { ShoppingBag } from 'lucide-react';
import { addonGroups, allowsAddons, hasMenuOption, hasVariants, menuOption } from '../../data/menuData';
import { useItemConfigurator } from '../../hooks/useItemConfigurator';
import { formatPrice } from '../../utils/formatPrice';
import Button from '../common/Button';
import Modal from '../common/Modal';
import QuantityStepper from '../common/QuantityStepper';
import OptionGroup from './OptionGroup';

const toOptions = (items) => items.map(({ id, name, price }) => ({ value: id, label: name, price }));

const SIDE_OPTIONS = menuOption.sides.map(({ id, name, surcharge }) => ({ value: id, label: name, price: surcharge }));
const SAUCE_OPTIONS = menuOption.sauces.map(({ id, name }) => ({ value: id, label: name }));
const EXTRA_OPTIONS = toOptions(addonGroups.extras);
const EXTRA_SAUCE_OPTIONS = toOptions(addonGroups.sauces);

/** Étel testreszabása: fajta, menü (köret + szósz), extrák, mennyiség. */
export default function ItemOptionsModal({ item, isOpen, onClose, onConfirm }) {
  const configurator = useItemConfigurator(item);
  const { selection, options, totalPrice } = configurator;

  const servingOptions = hasMenuOption(item)
    ? [
        { value: 'single', label: `Önmagában · ${formatPrice(item.price)}` },
        { value: 'menu', label: `Menüben · ${formatPrice(item.menuPrice)}` },
      ]
    : [];

  const footer = (
    <div className="flex items-center justify-between gap-4">
      <QuantityStepper value={selection.quantity} onChange={configurator.setQuantity} label="Mennyiség" />
      <Button size="md" className="flex-1" onClick={() => onConfirm(options, selection.quantity)}>
        <ShoppingBag aria-hidden="true" className="size-4" />
        Kosárba · {formatPrice(totalPrice)}
      </Button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={item.name} subtitle={item.description} footer={footer}>
      <div className="flex flex-col gap-7">
        {hasVariants(item) && (
          <OptionGroup
            legend="Válassz"
            options={item.variants.map((variant) => ({ value: variant, label: variant }))}
            selected={selection.variant}
            onChange={configurator.setVariant}
            columns={2}
          />
        )}

        {hasMenuOption(item) && (
          <OptionGroup
            legend="Kiszerelés"
            options={servingOptions}
            selected={selection.isMenu ? 'menu' : 'single'}
            onChange={(value) => configurator.setIsMenu(value === 'menu')}
          />
        )}

        {options.isMenu && (
          <>
            <OptionGroup
              legend="Menü köret"
              options={SIDE_OPTIONS}
              selected={selection.sideId}
              onChange={configurator.setSideId}
            />
            <OptionGroup
              legend="Menü szósz"
              options={SAUCE_OPTIONS}
              selected={selection.sauceId}
              onChange={configurator.setSauceId}
              columns={2}
            />
          </>
        )}

        {allowsAddons(item) && (
          <>
            <OptionGroup
              legend="Extrák hozzáadása"
              type="checkbox"
              options={EXTRA_OPTIONS}
              selected={selection.addonIds}
              onChange={configurator.toggleAddon}
              columns={2}
            />
            <OptionGroup
              legend="Extra szósz"
              type="checkbox"
              options={EXTRA_SAUCE_OPTIONS}
              selected={selection.addonIds}
              onChange={configurator.toggleAddon}
              columns={2}
            />
          </>
        )}
      </div>
    </Modal>
  );
}
