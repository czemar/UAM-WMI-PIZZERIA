import React from 'react';
import { faSearch, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Component } from 'react';
import { Badge } from '../badge-component/Badge.component';
import './Navbar.component.scss';

export class Navbar extends Component {
  render() {
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
            <FontAwesomeIcon icon={faShoppingBag} />
            <Badge count={2} />
          </li>
        </ul>
      </nav>
    );
  }
}
