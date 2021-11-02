import { EPizzaSize } from '../enums/pizza-size.enum';
export interface IPartialOrder {
  pizza: IPartialPizzaOrder[];
  sauce?: IPartialSauceOrder[];
  total: number;
}

export interface IPartialPizzaOrder {
  id: string;
  size: EPizzaSize;
  ingredients: string[];
  price: number;
}

export interface IPartialSauceOrder {
  id: string;
  count: number;
  price: number;
}