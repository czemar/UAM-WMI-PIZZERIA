import React from 'react';
import { faSearch, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Component } from 'react';
import { Badge } from '../badge-component/Badge.component';
import './navbar.component.scss';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { Link } from 'react-router-dom';

export class Navbar extends Component {

  private cartService: CartService = CartService.instance();

  private cartCountSubscription?: Subscription;

  state = {
    count: 0
  }

  componentDidMount() {
    this.cartCountSubscription = this.cartService.count().subscribe(count => {
      this.setState({ count });
    });
  }

  componentWillUnmount() {
    this.cartCountSubscription?.unsubscribe();
  }

  render() {
    const { count } = this.state;

    return (
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item nav-item-logo">_PZZA</li>
          <li className="nav-item">Menu</li>
        </ul>
        <ul className="nav-list">
          <li className="nav-item">
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
    );
  }
}
