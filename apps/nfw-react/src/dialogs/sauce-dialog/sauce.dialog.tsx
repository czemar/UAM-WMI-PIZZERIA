import React from 'react';
import { Dialog } from '../../libs/dialog/dialog.class';
import { translate } from '../../pipes/translate.pipe';
import { Button } from '../../components/button-component/button.component';
import { DialogWrapper } from '../../components/dialog-wrapper-component/dialog-wrapper.component';
import { Redirect } from 'react-router-dom';
import { ReactiveControl } from '../../libs/reactive-forms/classes/reactive-control.class';
import { ISauce } from '../../interfaces/souce.interface';
import { SauceService } from '../../services/sauce.service';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import RadioList from '../../components/radio-list-component/radio-list.component';
import { currency } from '../../pipes/currency.pipe';
import { Spinner } from '../../components/spinner-component/spinner.component';

export class SauceDialog extends Dialog {

  // -- dependencies --
  private sauceService: SauceService = SauceService.instance();
  private cartService: CartService = CartService.instance();

  // -- subscriptions --
  private saucesListSubscription?: Subscription;

  // -- state --
  public state = {
    redirect: false as boolean,
    sauce: new ReactiveControl<string>(null),
    sauces: [] as ISauce[]
  }

  // -- constructor --
  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  // -- lifecycle methods --
  componentDidMount(): void {
    this.saucesListSubscription = this.sauceService.list().subscribe((sauces) => {
      this.setState({ sauces });
    });
  }

  componentWillUnmount(): void {
    this.saucesListSubscription?.unsubscribe();
  }

  // -- methods --
  private goBack() {
    const redirect = true;
    this.setState({ redirect });
  }

  private addToCart() {

  }

  // -- render --
  render() {
    const { redirect, sauce, sauces } = this.state;

    if (redirect) {
      return (
        <Redirect to="/cart"></Redirect>
      )
    }

    const footer = (
      <div>
        <div onClick={ this.goBack }>
          <Button variant="secondary" className="w-full mb-4">
            {translate('Go back')}
          </Button>
        </div>
        <div onClick={ this.addToCart }>
          <Button variant="primary" className="w-full">
            {translate('Add to cart')}
          </Button>
        </div>
      </div>
    );

    return (
      <DialogWrapper title={translate('Select sauce')} footer={footer}>
        { sauces.length ?
          <RadioList
            control={sauce}
            radios={sauces}
            template={(sauce: ISauce) => (
              <div className="flex justify-between flex-grow">
                <p>{sauce.name}</p>
                <p>{currency(sauce.price)}</p>
              </div>
            )}
          />
          :
          <Spinner />
        }
      </DialogWrapper>
    )
  }
}
