import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import { Component } from 'react';
import './button.component.scss';
import { Spinner } from '../spinner-component/spinner.component';

export class Button extends Component<{
  variant: 'primary' | 'secondary';
  icon?: IconProp;
  className?: string;
  pending?: boolean;
}> {
  render() {
    const { children, variant, icon, className, pending } = this.props;

    return (
      <button className={classNames('button', variant, className, pending)}>
        { icon ? <FontAwesomeIcon icon={ icon } /> : '' }
        { pending ? <Spinner /> : '' }
        { children }
      </button>
    );
  }
}
