import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { businessInfo } from '../data/businessInfo';
import { useCart } from '../hooks/useCart';
import { submitOrder } from '../services/orderService';
import Button from '../components/common/Button';
import SectionHeading from '../components/common/SectionHeading';
import MenuSection from '../components/menu/MenuSection';
import CheckoutForm from '../components/order/CheckoutForm';
import OrderConfirmation from '../components/order/OrderConfirmation';
import OrderSummary from '../components/order/OrderSummary';

export default function OrderPage() {
  const { lines, clearCart } = useCart();
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const navigate = useNavigate();

  const placeOrder = async (customer) => {
    const result = await submitOrder({ customer, lines });
    setConfirmedOrder({ ...result, customerName: customer.name });
    clearCart();
  };

  const closeConfirmation = () => {
    setConfirmedOrder(null);
    navigate('/');
  };

  if (lines.length === 0) {
    return (
      <div className="pt-10">
        <MenuSection
          eyebrow="Rendelés"
          title="Még üres a kosarad"
          description="Válaszd ki, mit ennél – ha megvan, a kosár ikonra vagy az alsó sávra koppintva folytathatod a rendelést."
        />
        <OrderConfirmation order={confirmedOrder} onClose={closeConfirmation} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-28 sm:px-6 lg:px-8">
      <Button to="/#etlap" variant="ghost" size="sm" className="-ml-3 mb-4">
        <ArrowLeft aria-hidden="true" className="size-4" /> Vissza az étlapra
      </Button>

      <SectionHeading
        eyebrow="Pénztár"
        title="Rendelés leadása"
        description={`Kiszállítás: ${businessInfo.delivery.areas.join(', ')}. Fizetés átvételkor, készpénzzel vagy kártyával.`}
      />

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_24rem] xl:grid-cols-[1fr_27rem]">
        <CheckoutForm onSubmit={placeOrder} />
        <div className="order-first lg:sticky lg:top-24 lg:order-none">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
