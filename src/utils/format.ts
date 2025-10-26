export function formatCurrency(value: number, locale = 'en-US', currency = 'USD') {
  // Avoid floating point artifacts by rounding to 2 decimals before format
  const rounded = Math.round(value * 100) / 100;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(rounded);
}
