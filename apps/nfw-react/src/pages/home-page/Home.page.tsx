
import React from 'react';
import { HeaderBanner } from '../../components/header-banner-component/header-banner.component';
import { Page } from '../../libs/page/page.class';
import { PizzaService } from '../../services/pizza.service';
import { IPizzaWithIngredients } from '../../interfaces/pizza.interface';
import { Subscription } from 'rxjs';
import { Banner } from '../../components/banner-component/banner.component';
import { SearchService } from '../../services/search.service';
import { Spinner } from '../../components/spinner-component/spinner.component';
import { catchError } from 'rxjs';
import { translate } from '../../pipes/translate.pipe';
import './home.page.scss';

export class HomePage extends Page {

  // -- dependencies --
  private pizzaService: PizzaService = PizzaService.instance();
  private searchService: SearchService = SearchService.instance();

  // -- subscriptions --
  private pizzasListSubscription?: Subscription;
  private searchSubscription?: Subscription;

  // -- primitives --
  private searchString = '';
  private pizzasListArray = [];

  // -- state --
  public state = {
    pizzasList: [] as IPizzaWithIngredients[],
    search: '' as string,
    isLoading: true as boolean,
    failedToFetch: false as boolean
  };

  // -- constructor --
  constructor(props) {
    super(props);
  }

  // -- lifecycle methods --
  componentDidMount() {
    super.componentDidMount();

    const isLoading = true;

    this.setState({ isLoading });

    this.pizzasListSubscription = this.pizzaService
      .listWithIngredients()
      .pipe(catchError(err => {
        const failedToFetch = true;

        this.setState({ failedToFetch });

        throw err;
      }))
      .subscribe((pizzasListArray) => {
        this.pizzasListArray = pizzasListArray;
        this.refreshList();
      });
    
    this.searchSubscription = this.searchService
      .getSearch()
      .subscribe((searchString) => {
        this.searchString = searchString;
        this.refreshList();
      });
  }

  componentWillUnmount() {
    this.pizzasListSubscription?.unsubscribe();
    this.searchSubscription?.unsubscribe();
  }

  // -- methods --
  private refreshList() {
    const { searchString, pizzasListArray } = this;

    const search = searchString;
    const isLoading = !pizzasListArray.length;
    const pizzasList = pizzasListArray.filter(
      (pizza) => this.searchService.compare(pizza.name, search)
    );
  
    this.setState({ pizzasList, search, isLoading });
  }

  // -- render --
  render() {
    const { pizzasList, search, isLoading, failedToFetch } = this.state;

    if (failedToFetch) {
      return (
        <div className="text">{ translate('Something went wrong during fetching data from server...') }</div>
      )
    }

    if (isLoading) {
      return (
        <div>
          <Spinner />
        </div>
      );
    }

    return (
        <div>
          {pizzasList.length && !search ? <HeaderBanner pizzas={ pizzasList } /> : ''}
          <div className="pt-10">
            {pizzasList.map((pizza) => <Banner key={ pizza.id } pizza={ pizza } />)}
          </div>
          <footer className='footer'>
            <p>&copy; Marcin Czerniak</p>
            <a href="https://www.freepik.com/photos/food">Food photo created by stockking - www.freepik.com</a>
          </footer>
        </div>
      )
    ;
  }
}
