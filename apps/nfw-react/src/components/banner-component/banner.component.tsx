import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { Component } from "react";
import { IPizzaWithIngredients } from "../../interfaces/pizza.interface";
import { Button } from "../button-component/Button.component";
import './Banner.component.scss';

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
          <Button variant="secondary" icon={ faPlus }>Add to cart</Button>
        </div>
      </div>
    );
  }
}
