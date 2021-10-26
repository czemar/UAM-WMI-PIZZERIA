import React, { createRef, RefObject } from 'react';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Component } from 'react';
import { IPizzaWithIngredients } from '../../interfaces/pizza.interface';
import { Button } from '../button-component/Button.component';
import './HeaderBanner.component.scss';
import { currency } from '../../pipes/currency.pipe';
export class HeaderBanner extends Component<{
  pizzas: IPizzaWithIngredients[];
}> {
  private scrollViewRef: RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);

    this.scrollViewRef = createRef<HTMLDivElement>();

    this.slideRight = this.slideRight.bind(this);
    this.slideLeft = this.slideLeft.bind(this);
  }

  slideLeft() {
    this.slide(-1);
  }

  slideRight() {
    this.slide(1);
  }

  slide(direction: 1 | -1) {
    const screenWidth = screen.width;
    const { scrollLeft, scrollWidth } = this.scrollViewRef.current;
    const fullWidths = Math.floor(scrollLeft / screenWidth);

    this.scrollViewRef.current.scrollTo({
      left: Math.max(
        0,
        Math.min(
          (fullWidths + direction) * screenWidth,
          scrollWidth
        )
      ),
      behavior: 'smooth'
    });

    console.log();
  }

  render() {
    const { pizzas } = this.props;
    const { scrollViewRef } = this;

    return (
      <div className="header-banner-wrapper">
        <div className="header-banner-scroll" ref={scrollViewRef}>
          {pizzas.splice(0, 3).map((pizza) => (
            <div className="header-banner" key={pizza.id}>
              {/* Title */}
              <div className="title-container">
                <h2 className="title-backdrop">{pizza.name}</h2>
                <h2 className="title">{pizza.name}</h2>
              </div>

              {/* Image with previous / next buttons */}
              <div className="middle-section"></div>

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
                    <div className="price">{ currency(pizza.price) }</div>
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
        <div className="navigation">
          <div className="btn prev" onClick={this.slideLeft}>
            <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
          </div>
          <div className="btn next" onClick={this.slideRight}>
            <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
          </div>
        </div>
      </div>
    );
  }
}
