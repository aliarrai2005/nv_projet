import { useState } from 'react';

export const useMaskedCard = (initialValue = '') => {
  const [raw, setRaw] = useState(initialValue);
  const [focused, setFocused] = useState(false);

  const formatWithSpaces = (value) => {
    const digits = value.replace(/\D/g, '');
    const groups = digits.match(/.{1,4}/g) || [];
    return groups.join(' ');
  };

  const mask = (value) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length === 16) {
      return `${digits.slice(0,4)} **** **** ${digits.slice(-4)}`;
    } else if (digits.length > 4) {
      return `${digits.slice(0,4)} ${'*'.repeat(digits.length - 8)} ${digits.slice(-4)}`;
    }
    return digits;
  };

  const displayValue = focused || raw.length < 8 ? formatWithSpaces(raw) : mask(raw);

  const handleChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 16);
    setRaw(digits);
    return digits;
  };

  return {
    rawCardNumber: raw,
    displayValue,
    isFocused: focused,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onChange: handleChange,
  };
};