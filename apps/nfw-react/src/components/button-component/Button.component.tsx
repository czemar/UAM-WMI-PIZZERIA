import classNames from 'classnames';
import React from 'react';
import { Component } from 'react';
import './Button.component.scss';

export class Button extends Component<{
  variant: 'primary' | 'secondary';
}> {
  render() {
    const { children, variant } = this.props;

    return (
      <button className={classNames('button', variant)}>{children}</button>
    );
  }
}
