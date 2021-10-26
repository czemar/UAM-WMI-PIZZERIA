export function currency(value: string | number) {
  const n = Number(value);
  return new Intl
    .NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' })
    .format(n);
}