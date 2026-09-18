import { useState } from 'react';
import { PAYMENT_METHODS } from '../data/paymentMethods';
import { OTHER_TOWN, normalizePhone, validateCheckout, validateField } from '../utils/checkoutValidation';

const INITIAL_VALUES = {
  name: '',
  phone: '',
  town: '',
  address: '',
  note: '',
  paymentMethod: PAYMENT_METHODS[0].value,
};

/** Pénztár űrlap állapota: értékek, mezőnkénti validáció, beküldés. */
export function useCheckoutForm({ onSubmit }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const setFieldError = (field, value) =>
    setErrors((current) => ({ ...current, [field]: validateField(field, value) }));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    // Már érintett mezőnél gépelés közben is frissül a hibaüzenet;
    // a település választásnál azonnal jelezzük, ha oda nem szállítunk.
    if (touched[name] || name === 'town') setFieldError(name, value);
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
    setFieldError(name, value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateCheckout(values);
    setErrors(validationErrors);
    setTouched(Object.fromEntries(Object.keys(values).map((field) => [field, true])));

    if (Object.keys(validationErrors).length > 0) {
      const [firstInvalidField] = Object.keys(validationErrors);
      event.currentTarget.querySelector(`[name="${firstInvalidField}"]`)?.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await onSubmit({ ...values, phone: normalizePhone(values.phone), note: values.note.trim() });
      setValues(INITIAL_VALUES);
      setTouched({});
    } catch {
      setSubmitError('Nem sikerült leadni a rendelést. Próbáld újra, vagy hívj minket telefonon!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    submitError,
    isUndeliverable: values.town === OTHER_TOWN,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
