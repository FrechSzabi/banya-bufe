export const PAYMENT_METHODS = [
  { value: 'cash', label: 'Készpénz átvételkor' },
  { value: 'card', label: 'Bankkártya átvételkor' },
];

export const getPaymentMethodLabel = (value) =>
  PAYMENT_METHODS.find((method) => method.value === value)?.label ?? value;
