import { EPizzaSize } from '../enums/pizza-size.enum';
import { IIngredient } from './ingredient.interface';
import { Pizza } from '../../../../libs/api-interfaces/src/index';

export interface IPizza extends Pizza {
  size?: EPizzaSize;
};

export interface IWithIngredients {
  ingredients: IIngredient[];
}

export type IPizzaWithIngredients = Omit<IPizza, 'ingredients'> & IWithIngredients;