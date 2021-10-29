import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import { Component } from 'react';
import './Button.component.scss';

export class Button extends Component<{
  variant: 'primary' | 'secondary';
  icon?: IconProp;
}> {
  render() {
    const { children, variant, icon } = this.props;

    return (
      <button className={classNames('button', variant)}>
        { icon ? <FontAwesomeIcon icon={ icon } /> : '' }
        { children }
      </button>
    );
  }
}
