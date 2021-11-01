import React from 'react';
import { DialogWrapper } from '../../components/dialog-wrapper-component/dialog-wrapper.component';
import { Dialog } from '../../libs/dialog/dialog.class';
import { ActivatedRouteService } from '../../services/activated-route.service';
import { IPizza, IPizzaWithIngredients } from '../../interfaces/pizza.interface';
import { translate } from '../../pipes/translate.pipe';
import { Spinner } from '../../components/spinner-component/spinner.component';
import { PizzaService } from '../../services/pizza.service';
import { Subscription } from 'rxjs';
import { Button } from '../../components/button-component/button.component';
import { Select } from '../../components/select-component/select.cmponent';
import { ReactiveGroup } from '../../libs/reactive-forms/classes/reactive-group.class';
import { ReactiveControl } from '../../libs/reactive-forms/classes/reactive-control.class';
import { EPizzaSize } from '../../enums/pizza-size.enum';
import { selectOptionsFromEnum } from '../../interfaces/select-options.interface';
import CheckboxList from '../../components/checkbox-list-component/checkbox-list.component';
import { IIngredient } from '../../interfaces/ingredient.interface';
import { IngredientsService } from '../../services/ingredients.service';
import { currency } from '../../pipes/currency.pipe';
import { CartService } from '../../services/cart.service';
import { IPartialPizzaOrder } from '../../interfaces/order.interface';
import './pizza.dialog.scss';
import groupBy from 'lodash-es/groupBy';
import identity from 'lodash-es/identity';
import { mapValues } from 'lodash-es';
import { Redirect } from 'react-router-dom';

export class PizzaDialog extends Dialog {
  // -- dependencies --
  private readonly activatedRouteService: ActivatedRouteService =
    ActivatedRouteService.instance();
  private readonly pizzaService: PizzaService = PizzaService.instance();
  private readonly ingredientService: IngredientsService =
    IngredientsService.instance();
  private readonly cartService: CartService = CartService.instance();

  // -- subscriptions --
  private pizzaByIdSubscription: Subscription;
  private ingredientsSubscription: Subscription;
  private detailsValueChangesSubscription: Subscription;

  // -- primitives --
  private pizzasSizes = selectOptionsFromEnum(EPizzaSize);

  // -- state --
  public state = {
    finishedCustomization: false as boolean,
    pizza: null as IPizzaWithIngredients,
    ingredients: null as IIngredient[],
    details: new ReactiveGroup({
      size: new ReactiveControl<EPizzaSize>(EPizzaSize.SIZE_32CM),
      ingredients: new ReactiveControl<string[]>([]),
    })
  };

  constructor(props) {
    super(props);

    this.getPrice = this.getPrice.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.getIngredientById = this.getIngredientById.bind(this);
    this.getSelectedIngredients = this.getSelectedIngredients.bind(this);
  }

  // -- lifecycle methods --
  componentDidMount(): void {
    const { pizzaId } = this.activatedRouteService.params;
    const { details } = this.state;

    this.pizzaByIdSubscription = this.pizzaService
      .byIdWithIngredients(pizzaId)
      .subscribe((pizza) => {
        this.setState({ pizza });
      });

    this.ingredientsSubscription = this.ingredientService
      .list()
      .subscribe((ingredients) => {
        this.setState({ ingredients });
      });

    this.detailsValueChangesSubscription = details.valueChanges.subscribe(() => {
      this.setState({ details });
    });
  }

  componentWillUnmount(): void {
    this.pizzaByIdSubscription?.unsubscribe();
    this.ingredientsSubscription?.unsubscribe();
    this.detailsValueChangesSubscription?.unsubscribe();
  }

  // -- methods --
  private addToCart() {
    const { pizza } = this.state;

    const ingredients = this.getSelectedIngredients();
    const finishedCustomization = true;

    const partialOrder = {
      id: pizza.id,
      ingredients: ingredients
    } as IPartialPizzaOrder;

    this.cartService.add(partialOrder);
    this.setState({ finishedCustomization });
  }

  private getSelectedIngredients() {
    const { pizza, details } = this.state;

    const ingredients = Object.entries(details.value.ingredients)
      .filter(([_, checked]) => checked)
      .map(([id, _]) => id);

    return [ ...pizza.ingredients.map(i => i.id), ...ingredients];
  }

  private getSelectedIngredientsCollapsed() {
    return Object.values(groupBy(
      this.getSelectedIngredients().map(
        id => this.getIngredientById(id)?.name
      ), identity
    )).map((v) => v.length > 1 ? `${v.length} x ${v[0]}` : v[0]);
  }

  private getIngredientById(id: string) {
    const { ingredients } = this.state;

    return ingredients.find((ingredient: IIngredient) => ingredient.id === id);
  }

  private getPrice() {
    const { pizza, details } = this.state;

    const ingredientsPrice = Object.entries(details.value.ingredients)
      .filter(([_, checked]) => checked)
      .map(([id, _]) => this.getIngredientById(id)?.price)
      .reduce((sum, value) => sum + (value || 0), 0);

    return ingredientsPrice + pizza.price;
  }

  // -- render --
  render() {
    const { pizzasSizes } = this;
    const { pizza, details, ingredients, finishedCustomization } = this.state;

    if (finishedCustomization) {
      return (
        <Redirect to="/cart"></Redirect>
      );
    }

    if (!pizza || !ingredients) {
      return (
        <DialogWrapper title="&nbsp;">
          <div>
            <Spinner />
          </div>
        </DialogWrapper>
      );
    }

    const footer = (
      <div onClick={ this.addToCart }>
        <Button variant="primary" className="w-full">
          {translate('Add to cart')}
        </Button>
      </div>
    );

    return (
      <DialogWrapper title={pizza.name} footer={footer}>
        <section className='pizza-section'>
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
          </div>
        </section>
        <section>
          <h3 className="title">{translate('Size')}</h3>
          <div className="content">
            <Select options={pizzasSizes} control={details.get('size')} />
          </div>
        </section>
        {ingredients.length ? (
          <section>
            <h3 className="title">{translate('Additional ingredients')}</h3>
            <div className="content">
              <CheckboxList
                control={details.get('ingredients')}
                checkboxes={ingredients}
                template={(ingredient: IIngredient) => (
                  <div className="flex justify-between flex-grow">
                    <p>{ingredient.name}</p>
                    <p>{currency(ingredient.price)}</p>
                  </div>
                )}
              />
            </div>
          </section>
        ) : (
          ''
        )}
        <section>
          <h3 className="title">{translate('Summary')}</h3>
          <div className="content">
            <div className="name font-bold">{pizza.name} - {details.get('size').value}</div>
            <div className="ingredients-list">
              {this.getSelectedIngredientsCollapsed().map((ingredient: string, index: number) => (
                <span key={index}>
                  {ingredient}
                </span>
              ))}
            </div>
            <div className="price">
              {currency(this.getPrice())}
            </div>
          </div>
        </section>
      </DialogWrapper>
    );
  }
}
