import { HeaderBanner } from '../../components/header-banner-component/HeaderBanner.component';
import { Page } from '../../libs/page/page.class';
import { PizzaService } from '../../services/pizza.service';
import { IPizzaWithIngredients } from '../../interfaces/pizza.interface';
import { Subscription } from 'rxjs';
import React from 'react';

export class HomePage extends Page {
  private pizzaService: PizzaService = PizzaService.instance();

  private pizzasListSubscription?: Subscription;

  state = {
    pizzasList: [] as IPizzaWithIngredients[],
  };

  componentDidMount() {
    this.pizzasListSubscription = this.pizzaService
      .listWithIngredients()
      .subscribe((pizzasList) => {
        console.log(pizzasList);
        this.setState({ pizzasList });
      });
  }

  componentWillUnmount() {
    this.pizzasListSubscription?.unsubscribe();
  }

  render() {
    const { pizzasList } = this.state;

    return <>{pizzasList.length ? <HeaderBanner pizzas={pizzasList} /> : ''}</>;
  }
}
