import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { Component } from "react";
import { IPizzaWithIngredients } from "../../interfaces/pizza.interface";
import { Button } from "../button-component/button.component";
import './banner.component.scss';
import { translate } from '../../pipes/translate.pipe';
import { Link } from "react-router-dom";
import { currency } from '../../pipes/currency.pipe';

export class Banner extends Component<{
  pizza: IPizzaWithIngredients
}> {
  render() {
    const { pizza } = this.props;

    return (
      <div className="banner">
        <div className="w-3/4">
          <div className="image"></div>
        </div>
        <div className="w-full pl-5">
          <div className="name">{pizza.name}</div>
          <div className="ingredients-list">
            {pizza.ingredients.map((ingredient) => (
              <span key={ingredient.id}>{ingredient.name}</span>
            ))}
          </div>
          <div className="price">
            {currency(pizza.price)}
          </div>
          <Link to={`/pizza/${pizza.id}`}>
            <Button
              variant="secondary"
              icon={ faPlus }
            >{ translate('ADD TO CART') }</Button>
          </Link>
        </div>
      </div>
    );
  }
}
