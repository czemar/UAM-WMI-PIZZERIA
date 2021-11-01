import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import { Component } from 'react';
import './button.component.scss';

export class Button extends Component<{
  variant: 'primary' | 'secondary';
  icon?: IconProp;
  className?: string;
}> {
  render() {
    const { children, variant, icon, className } = this.props;

    return (
      <button className={classNames('button', variant, className)}>
        { icon ? <FontAwesomeIcon icon={ icon } /> : '' }
        { children }
      </button>
    );
  }
}
