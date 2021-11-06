import React from 'react';
import { faSearch, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Component } from 'react';
import { Badge } from '../badge-component/badge.component';
import './navbar.component.scss';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { Link } from 'react-router-dom';
import { translate } from '../../pipes/translate.pipe';
import classNames from 'classnames';
import { SearchService } from '../../services/search.service';
import { ReactiveControl } from '../../libs/reactive-forms/classes/reactive-control.class';

export class Navbar extends Component {

  // -- dependencies --
  private cartService: CartService = CartService.instance();
  private searchService: SearchService = SearchService.instance();

  // -- subscriptions --
  private cartCountSubscription?: Subscription;

  // -- state --
  public state = {
    count: 0 as number,
    isSearchBarOpen: false as boolean,
    searchControl: new ReactiveControl('')
  }

  // -- constructor --
  constructor(props) {
    super(props);

    this.openSearchBar = this.openSearchBar.bind(this);
    this.closeSearchBar = this.closeSearchBar.bind(this);
    this.toggleSearchBar = this.toggleSearchBar.bind(this);
  }

  componentDidMount() {
    const { searchControl } = this.state;

    this.cartCountSubscription = this.cartService.count().subscribe(count => {
      this.setState({ count });
    });

    searchControl.valueChanges.subscribe((str) => {
      this.searchService.setSearch(str);
      this.setState({ searchControl });
    });
  }

  componentWillUnmount() {
    this.cartCountSubscription?.unsubscribe();
  }

  openSearchBar() {
    this.setState({ isSearchBarOpen: true });
  }

  closeSearchBar() {
    const { searchControl } = this.state;
    const isSearchBarOpen = false;

    searchControl.setValue('');
    this.searchService.clearSearch();

    this.setState({ isSearchBarOpen, searchControl });
  }

  toggleSearchBar() {
    if (this.state.isSearchBarOpen) {
      this.closeSearchBar();
    } else {
      this.openSearchBar();
    }
  }

  render() {
    const { count, isSearchBarOpen, searchControl } = this.state;

    return (
      <>
        {/* Navigation bar */}
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item nav-item-logo">
              <Link to="/">
                _PZZA
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/">
                { translate('Main page') }
              </Link>
            </li>
          </ul>
          <ul className="nav-list">
            <li className="nav-item" onClick={this.toggleSearchBar}>
              <FontAwesomeIcon icon={faSearch} />
            </li>
            <li className="nav-item">
              <Link to="/cart">
                <FontAwesomeIcon icon={faShoppingBag} />
                <Badge count={ count } />
              </Link>
            </li>
          </ul>
        </nav>

        {/* Search bar */}
        <div className={classNames('search-bar', isSearchBarOpen ? 'open' : 'closed')}>
          <input
            type="text"
            className="search-input"
            value={searchControl.value}
            onChange={(e) => searchControl.setValue(e.target.value)}
          />
          <div className="search-button">
            <FontAwesomeIcon icon={ faSearch } />
          </div>
        </div>
      </>
    );
  }
}
