# Bánya Büfé – webapp

Egyoldalas React webalkalmazás a piliscsabai Bánya Büfének: bemutatkozás, étlap, nyitvatartás, térkép és online rendelés (frontend-only).

## Indítás

```bash
npm install
npm run dev      # fejlesztői szerver
npm run build    # production build a dist/ mappába
```

**Stack:** React 19 · Vite · React Router · Tailwind CSS v4 · lucide-react

## Szerkezet

```
src/
  assets/            index.js (fotó betöltés) + photos/ (ide kerülnek a képek)
  components/
    layout/          Header, Navigation, CartButton, Footer, ImpressumModal, ScrollManager
    home/            Hero, QuickInfoBar, About, Gallery, Reviews, Hours, LocationMap
    menu/            MenuSection, CategoryTabs, MenuCategory, MenuItemCard, MenuItemRow,
                     AddToCartButton, ItemOptionsModal, OptionGroup
    order/           Cart (drawer), CartItem, MobileCartBar, CheckoutForm, OrderSummary, OrderConfirmation
    common/          Button, Badge, SectionHeading, Modal, PhotoFrame, QuantityStepper, FormField, …
  context/           CartContext.jsx  (useReducer + localStorage)
  data/              menuData.js, businessInfo.js, navigation.js
  hooks/             useCart, useAddToCart, useItemConfigurator, useCheckoutForm, useOpeningStatus, useDialog
  services/          orderService.js  (MOCK rendelés-leadás)
  utils/             cartLine, checkoutValidation, openingHours, formatPrice
  pages/             HomePage.jsx, OrderPage.jsx
```

## Élesítés előtti teendők (TODO-k a kódban)

| Mit                                   | Hol                                        |
| ------------------------------------- | ------------------------------------------ |
| Helyszín fotók bemásolása             | `src/assets/photos/` (lásd README ott)     |
| Valós vélemények a placeholderek helyett | `src/data/businessInfo.js` → `reviews`  |
| Pontos GPS koordináták a térképhez    | `src/data/businessInfo.js` → `map`         |
| Facebook oldal valós URL-je           | `src/data/businessInfo.js` → `social`      |
| Szállítási díj, becsült idő           | `src/data/businessInfo.js` → `delivery`    |
| Gyrosok összetevői, menü köretek      | `src/data/menuData.js`                     |
| Impresszum cégadatai                  | `src/components/layout/ImpressumModal.jsx` |
| **Valódi rendelés-továbbítás (backend / e-mail)** | `src/services/orderService.js` |

## Hosting megjegyzés

A BrowserRouter miatt a szervernek minden útvonalra az `index.html`-t kell kiszolgálnia
(pl. Netlify: `_redirects` → `/* /index.html 200`; Vercel: rewrites).
