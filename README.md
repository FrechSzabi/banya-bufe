# Bánya Büfé – webapp

Egyoldalas React webalkalmazás a piliscsabai Bánya Büfének: bemutatkozás, étlap, nyitvatartás, térkép és online rendelés, saját backenddel és admin felülettel (`/admin`) a rendelések kezeléséhez.

## Indítás

Node.js 22.13+ kell (a beépített `node:sqlite` miatt).

```bash
npm install
cp .env.example .env   # ADMIN_PASSWORD és SESSION_SECRET kitöltése

# Fejlesztés – két terminálban:
npm run dev:server     # backend: http://localhost:3001 (újraindul mentéskor)
npm run dev            # frontend: a Vite az /api kéréseket a backendre továbbítja

# Éles üzem:
npm run build          # production build a dist/ mappába
npm start              # a backend szolgálja ki az API-t és a dist/ oldalt is
```

**Stack:** React 19 · Vite · React Router · Tailwind CSS v4 · lucide-react · Express 5 · SQLite (`node:sqlite`)

## Backend és admin

- **Rendelés leadása:** `POST /api/orders`. A kliens csak azonosítókat küld (tétel, fajta, köret, szósz, extrák);
  a neveket és az árakat a szerver az étlapból (`src/data/menuData.js`) számolja újra, így az ár nem hamisítható.
  A vevő adatait ugyanaz a validáció ellenőrzi, mint az űrlapot. IP-nként 10 rendelés / 10 perc.
- **Admin felület:** `/admin` – jelszavas belépés (`ADMIN_PASSWORD`), 12 órás munkamenet (HttpOnly süti).
  Oszlopok: *Új* → *Kész* → *Kiszállítás alatt*, a *Befejezett* és a *Lemondott* rendelések külön fülön (utolsó 100).
  Bármelyik állapot egy koppintással beállítható (tévedés esetén vissza is). Lemondás (pl. kamu rendelés)
  megerősítéssel, a lemondott rendelés visszaállítható. 15 másodpercenként frissül,
  új rendeléskor a böngészőfül címe jelez, a „Hang” gombbal hangjelzés is kérhető.
- **Adatbázis:** `data/orders.db` (SQLite, `DB_PATH`-szal áthelyezhető) – érdemes rendszeresen menteni.

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
  services/          orderService.js (rendelés → API), adminApi.js
  components/admin/  AdminLogin, OrderDashboard, OrderCard, OrderStatusControl
server/              index.js (Express), db.js (SQLite), orderBuilder.js (ár-újraszámolás, validáció),
                     auth.js (admin belépés), rateLimit.js, config.js
  utils/             cartLine, checkoutValidation, openingHours, formatPrice
  pages/             HomePage.jsx, OrderPage.jsx, AdminPage.jsx
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
| Erős `ADMIN_PASSWORD` és `SESSION_SECRET` beállítása | `.env` (lásd `.env.example`) |

## Hosting megjegyzés

A backend miatt Node.js-t futtató tárhely kell (VPS, Render, Railway, Fly.io stb.) – tisztán statikus
tárhely (Netlify, Vercel static) már nem elég. Az adatbázis fájlnak tartós (perzisztens) lemezen kell lennie.
Az `npm start` a frontendet is kiszolgálja, és minden egyéb útvonalra az `index.html`-t adja (SPA).
HTTPS-t a reverse proxy (pl. nginx, Caddy, Railway) adjon; ilyenkor `TRUST_PROXY=1` kell, hogy a szerver
a valódi kliens IP-t és a HTTPS-t lássa (a belépési süti ekkor automatikusan `Secure`).
