export interface ISelectOption {
  value: string | number;
  label: string;
}

export function selectOptionsFromEnum(enumerable: { [key: string]: string }) {
  return Object.entries(enumerable).map(([value, label]) => ({ value, label }));
}