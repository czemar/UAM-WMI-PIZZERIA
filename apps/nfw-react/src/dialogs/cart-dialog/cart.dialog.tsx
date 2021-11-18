import React from 'react';
import { DialogWrapper } from "../../components/dialog-wrapper-component/dialog-wrapper.component";
import { Dialog } from "../../libs/dialog/dialog.class";
import { CartService } from '../../services/cart.service';
import { Subscription, take } from 'rxjs';
import { IPartialPizzaOrder, IPartialOrder } from '../../interfaces/order.interface';
import { currency } from '../../pipes/currency.pipe';
import { PizzaService } from '../../services/pizza.service';
import { IIngredient } from '../../interfaces/ingredient.interface';
import { ISauce } from '../../interfaces/souce.interface';
import { IPizza } from '../../interfaces/pizza.interface';
import { Spinner } from '../../components/spinner-component/spinner.component';
import { translate } from '../../pipes/translate.pipe';
import { groupBy, identity } from 'lodash';
import { IngredientsService } from '../../services/ingredients.service';
import './cart.dialog.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../components/button-component/button.component';
import { OrderService } from '../../services/order.service';
import { DialogService } from '../../services/dialog.service';
import { SuccessDialog } from '../success-dialog/success.dialog';

export class CartDialog extends Dialog {

  // -- dependencies --
  private readonly cartService: CartService = CartService.instance();
  private readonly pizzaService: PizzaService = PizzaService.instance();
  private readonly ingredientService: IngredientsService = IngredientsService.instance();
  private readonly orderService: OrderService = OrderService.instance();
  private readonly dialogService: DialogService = DialogService.instance();

  // -- subscriptions --
  private cartListSubscription: Subscription;
  private pizzasListSubscription: Subscription;
  private ingredientsListSubscription: Subscription;
  private totalSubscription: Subscription;
  private orderSubscription: Subscription;

  // -- state --
  public state = {
    cart: null as IPartialPizzaOrder[],
    pizzas: [] as IPizza[],
    ingredients: [] as IIngredient[],
    sauces: [] as ISauce[],
    total: 0 as number,
    order: null as IPartialOrder,
    orderInProgress: false as boolean
  }

  // -- constructor --
  constructor(props) {
    super(props);

    this.getPizzaById = this.getPizzaById.bind(this);
    this.getCollapsedIngredientsListForPizza = this.getCollapsedIngredientsListForPizza.bind(this);
    this.getIngredientById = this.getIngredientById.bind(this);
    this.order = this.order.bind(this);
  }

  // -- lifecycle methods --
  componentDidMount(): void {
    this.cartListSubscription = this.cartService.list().subscribe((cart) => {
      this.setState({ cart });
    });
    this.pizzasListSubscription = this.pizzaService.list().subscribe((pizzas) => {
      this.setState({ pizzas });
    });
    this.ingredientsListSubscription = this.ingredientService.list().subscribe((ingredients) => {
      this.setState({ ingredients });
    });
    this.totalSubscription = this.cartService.total().subscribe((total) => {
      this.setState({ total });
    });
  }

  componentWillUnmount(): void {
    this.cartListSubscription?.unsubscribe();
    this.pizzasListSubscription?.unsubscribe();
    this.ingredientsListSubscription?.unsubscribe();
    this.totalSubscription?.unsubscribe();
  }

  // -- methods --
  private getPizzaById(id: string) {
    const { pizzas } = this.state;

    return pizzas.find((pizza) => pizza.id === id);
  }

  private getIngredientById(id: string) {
    const { ingredients } = this.state;

    return ingredients.find((ingredient: IIngredient) => ingredient.id === id) || { name: '...' };
  }

  private getCollapsedIngredientsListForPizza(id: number) {
    const { cart } = this.state;

    const additionalIngredients = cart[id];

    return Object.values(groupBy(
      [...additionalIngredients.ingredients].map(
        id => this.getIngredientById(id)?.name
      ), identity
    )).map((v) => v.length > 1 ? `${v.length} x ${v[0]}` : v[0]);
  }

  private async order() {
    const { orderInProgress } = this.state;
    if (orderInProgress) return;

    this.setState({ orderInProgress: true });

    const subscription = (await this.orderService.order())
      .catchError(() => {
        this.setState({ orderInProgress: false });
      }).subscribe((response) => {
        if (!response || (response as any).statusCode === 400) {
          return;
        }

        this.dialogService.open(SuccessDialog);
        this.cartService.clear();

        subscription.unsubscribe();
      });
  }

  // -- render --
  render() {
    const { cart, total, orderInProgress } = this.state;

    if (!cart) {
      return (
        <DialogWrapper title={translate('Cart')}>
          <Spinner />
        </DialogWrapper>
      )
    }

    const footer = (
      <div onClick={ this.order }>
        <Button variant="primary" className="w-full" pending={ orderInProgress }>
          {translate('Order')}
        </Button>
      </div>
    );

    return (
      <DialogWrapper title={translate('Cart')} footer={footer}>
        <div className='cartDialog'>
          {!cart.length ?
            <p>{translate('Cart is empty')}</p>
          :
            ''
          }
          {cart.map((partial, pIndex) =>
            <div key={pIndex} className='pizzas-container'>
              <div className="w-3/4">
                <div className="image"></div>
              </div>
              {[this.getPizzaById(partial.id)].map((pizza) =>
                pizza ?
                <div className="w-full pl-5" key={pizza.id}>
                  <div className="name">{pizza.name} - {partial.size}</div>
                  <div className="ingredients-list">
                    {this.getCollapsedIngredientsListForPizza(pIndex).map((ingredient, iIndex) => (
                      <span key={iIndex}>{ingredient}</span>
                    ))}
                  </div>
                  <div className="price">
                    {currency(partial.price)}
                  </div>
                  <div className='cart-remove' onClick={() => this.cartService.removeOne(partial)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                </div>
                :
                <Spinner key={null} />
              )}
            </div>
          )}
          <div className="total">
            <div className="title">{translate('Total')}:</div>
            <div className="sum">{currency(total)}</div>
          </div>
        </div>
      </DialogWrapper>
    );
  }
}
