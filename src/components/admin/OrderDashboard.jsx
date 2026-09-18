import { useEffect, useState } from 'react';
import { Bell, BellOff, LogOut, RefreshCw } from 'lucide-react';
import { ACTIVE_STATUS_IDS, getOrderStatusLabel } from '../../data/orderStatuses';
import { useAdminOrders } from '../../hooks/useAdminOrders';
import { playNotificationSound, unlockNotificationSound } from '../../utils/notificationSound';
import NeonWordmark from '../common/NeonWordmark';
import OrderCard from './OrderCard';
import { STATUS_STYLES } from './orderStatusStyles';

const VIEWS = [
  { id: 'active', label: 'Folyamatban' },
  { id: 'completed', label: 'Befejezett' },
  { id: 'cancelled', label: 'Lemondott' },
];

const CLOSED_VIEW_TEXTS = {
  completed: { intro: 'A legutóbbi 100 befejezett rendelés.', empty: 'Még nincs befejezett rendelés.' },
  cancelled: {
    intro: 'A legutóbbi 100 lemondott rendelés. Tévedés esetén egy állapotgombbal visszaállítható.',
    empty: 'Nincs lemondott rendelés.',
  },
};

const updatedFormatter = new Intl.DateTimeFormat('hu-HU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

const EmptyState = ({ children }) => (
  <p className="border border-dashed border-steel px-4 py-8 text-center text-ash">{children}</p>
);

export default function OrderDashboard({ onLogout, onAuthError }) {
  const [view, setView] = useState('active');
  // Hangot csak kattintás után engedélyez a böngésző, ezért mindig kikapcsolva indul
  const [isSoundOn, setIsSoundOn] = useState(false);

  const { orders, isLoading, error, lastUpdated, pendingIds, refresh, updateStatus } = useAdminOrders({
    view,
    onError: onAuthError,
    onNewOrders: () => {
      if (isSoundOn) playNotificationSound();
    },
  });

  const newCount = view === 'active' ? orders.filter((order) => order.status === 'new').length : 0;

  useEffect(() => {
    document.title = newCount > 0 ? `(${newCount}) Új rendelés · Bánya Büfé` : 'Rendelések · Bánya Büfé';
  }, [newCount]);

  const toggleSound = () => {
    const next = !isSoundOn;
    if (next) {
      unlockNotificationSound();
      playNotificationSound();
    }
    setIsSoundOn(next);
  };

  const cardProps = (order) => ({
    order,
    isPending: pendingIds.has(order.id),
    onStatusChange: updateStatus,
  });

  return (
    <div className="min-h-svh">
      <header className="sticky top-0 z-30 border-b border-steel bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-[110rem] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3 sm:px-6">
          <div className="flex items-baseline gap-3">
            <NeonWordmark size="sm" />
            <h1 className="font-condensed text-sm font-semibold uppercase tracking-[0.25em] text-ash">Rendelések</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={isSoundOn}
              className={`inline-flex h-10 items-center gap-2 border px-3 font-condensed text-sm font-semibold uppercase tracking-wider transition ${
                isSoundOn ? 'border-mustard text-mustard' : 'border-steel text-bone/80 hover:border-bone/50'
              }`}
            >
              {isSoundOn ? <Bell aria-hidden="true" className="size-4" /> : <BellOff aria-hidden="true" className="size-4" />}
              {isSoundOn ? 'Hang be' : 'Hang ki'}
            </button>
            <button
              type="button"
              onClick={refresh}
              className="inline-flex h-10 items-center gap-2 border border-steel px-3 font-condensed text-sm font-semibold uppercase tracking-wider text-bone/80 transition hover:border-bone/50"
            >
              <RefreshCw aria-hidden="true" className="size-4" /> Frissítés
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex h-10 items-center gap-2 border border-steel px-3 font-condensed text-sm font-semibold uppercase tracking-wider text-bone/80 transition hover:border-signal hover:text-signal"
            >
              <LogOut aria-hidden="true" className="size-4" /> Kilépés
            </button>
          </div>
        </div>

        <div className="mx-auto flex max-w-[110rem] items-end justify-between gap-4 px-4 sm:px-6">
          <div role="tablist" aria-label="Nézet" className="flex overflow-x-auto">
            {VIEWS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={view === id}
                onClick={() => setView(id)}
                className={`shrink-0 border-b-4 px-3 py-2 sm:px-4 font-condensed text-base font-semibold uppercase tracking-wider transition ${
                  view === id ? 'border-mustard text-bone' : 'border-transparent text-ash hover:text-bone'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <p aria-live="polite" className="hidden pb-2 text-xs text-ash sm:block">
            {lastUpdated && `Frissítve: ${updatedFormatter.format(lastUpdated)}`}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-[110rem] px-4 py-6 sm:px-6">
        {error && (
          <p role="alert" className="mb-6 border border-signal/60 bg-signal/10 p-4 text-sm">
            {error}
          </p>
        )}

        {isLoading ? (
          <p className="text-ash">Betöltés…</p>
        ) : view === 'active' ? (
          <div className="grid items-start gap-6 lg:grid-cols-3">
            {ACTIVE_STATUS_IDS.map((statusId) => {
              const columnOrders = orders.filter((order) => order.status === statusId);
              return (
                <section key={statusId} aria-labelledby={`col-${statusId}`} className="flex flex-col gap-4">
                  <h2
                    id={`col-${statusId}`}
                    className={`flex items-center justify-between border-t-4 bg-graphite px-4 py-2 font-display text-2xl tracking-wide ${STATUS_STYLES[statusId].accent}`}
                  >
                    {getOrderStatusLabel(statusId)}
                    <span className="font-condensed text-lg font-semibold text-ash tabular-nums">
                      {columnOrders.length}
                    </span>
                  </h2>
                  {columnOrders.length === 0 ? (
                    <EmptyState>Nincs rendelés</EmptyState>
                  ) : (
                    columnOrders.map((order) => <OrderCard key={order.id} {...cardProps(order)} />)
                  )}
                </section>
              );
            })}
          </div>
        ) : orders.length === 0 ? (
          <EmptyState>{CLOSED_VIEW_TEXTS[view].empty}</EmptyState>
        ) : (
          <>
            <p className="mb-4 text-sm text-ash">{CLOSED_VIEW_TEXTS[view].intro}</p>
            <div className="grid items-start gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {orders.map((order) => (
                <OrderCard key={order.id} {...cardProps(order)} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
