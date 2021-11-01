export interface IPartialOrder {
  pizza: IPartialPizzaOrder[];
  sauce?: IPartialSauceOrder[];
  total: number;
}

export interface IPartialPizzaOrder {
  id: string;
  ingredients: string[];
}

export interface IPartialSauceOrder {
  id: string;
  count: number;
}