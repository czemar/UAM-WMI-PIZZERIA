import React from 'react';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Component } from 'react';
import { IPizzaWithIngredients } from '../../interfaces/pizza.interface';
import { Button } from '../button-component/Button.component';
import './HeaderBanner.component.scss';
export class HeaderBanner extends Component<{
  pizzas: IPizzaWithIngredients[];
}> {
  render() {
    const { pizzas } = this.props;

    return (
      <div className="header-banner-wrapper">
        {pizzas.splice(0, 3).map((pizza) => (
          <div className="header-banner" key={pizza.id}>
            {/* Title */}
            <div className="title-container">
              <h2 className="title-backdrop">{pizza.name}</h2>
              <h2 className="title">{pizza.name}</h2>
            </div>

            {/* Image with previous / next buttons */}
            <div className="middle-section">
              <div className="image"></div>
              <div className="navigation">
                <div className="btn prev">
                  <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
                </div>
                <div className="btn next">
                  <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                </div>
              </div>
            </div>

            {/* Price, ingredients and add to basket button */}
            <div>
              {/* Ornament */}
              <div className="ornament flex justify-end">
                <div className="w-1/2 flex flex-col items-end">
                  <div className="w-1/2">
                    <hr></hr>
                  </div>
                  <hr></hr>
                </div>
              </div>

              <div className="flex">
                {/* Price */}
                <div className="w-1/2 price-box">
                  <div className="price">{pizza.price}</div>
                  <div className="subprice">for 32 cm size</div>
                </div>

                {/* Ingredients and add to cart button */}
                <div className="w-1/2">
                  <div className="ingredients-list">
                    {pizza.ingredients.map((ingredient) => (
                      <span key={ingredient.id}>{ingredient.name}</span>
                    ))}
                  </div>
                  <Button variant="primary">ADD TO BASKET</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
