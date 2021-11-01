import React, { Component } from 'react';
import './spinner.component.scss';

export class Spinner extends Component {
  render() {
    return (
      <div className="spinner">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}