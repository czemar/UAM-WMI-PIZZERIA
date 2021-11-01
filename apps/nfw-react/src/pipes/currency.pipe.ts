import { environment } from '../environments/environment';

export function currency(value: string | number) {
  const n = Number(value);
  return new Intl
    .NumberFormat(environment.language, { style: 'currency', currency: 'PLN' })
    .format(n);
}