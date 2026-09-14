import { useMemo, useState } from 'react';
import { addonGroups, hasMenuOption, hasVariants, menuOption } from '../data/menuData';
import { calculateUnitPrice } from '../utils/cartLine';

const ALL_ADDONS = [...addonGroups.extras, ...addonGroups.sauces];

/** Egy étel testreszabásának állapota (fajta, menü, köret, szósz, extrák, mennyiség). */
export function useItemConfigurator(item) {
  const [variant, setVariant] = useState(hasVariants(item) ? item.variants[0] : null);
  const [isMenu, setIsMenu] = useState(false);
  const [sideId, setSideId] = useState(menuOption.sides[0].id);
  const [sauceId, setSauceId] = useState(menuOption.sauces[0].id);
  const [addonIds, setAddonIds] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const options = useMemo(() => {
    const menuSelected = hasMenuOption(item) && isMenu;
    return {
      variant,
      isMenu: menuSelected,
      side: menuSelected ? menuOption.sides.find((side) => side.id === sideId) : null,
      sauce: menuSelected ? menuOption.sauces.find((sauce) => sauce.id === sauceId) : null,
      addons: ALL_ADDONS.filter((addon) => addonIds.includes(addon.id)).map(({ id, name, price }) => ({
        id,
        name,
        price,
      })),
    };
  }, [item, variant, isMenu, sideId, sauceId, addonIds]);

  const toggleAddon = (addonId) =>
    setAddonIds((current) =>
      current.includes(addonId) ? current.filter((id) => id !== addonId) : [...current, addonId],
    );

  const unitPrice = calculateUnitPrice(item, options);

  return {
    selection: { variant, isMenu, sideId, sauceId, addonIds, quantity },
    setVariant,
    setIsMenu,
    setSideId,
    setSauceId,
    toggleAddon,
    setQuantity,
    options,
    unitPrice,
    totalPrice: unitPrice * quantity,
  };
}
