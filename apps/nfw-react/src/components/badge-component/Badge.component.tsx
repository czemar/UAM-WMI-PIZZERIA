import React from 'react';
import { Component } from 'react';
import './Badge.component.scss';

export class Badge extends Component<{ count: number }> {
  render() {
    const { count } = this.props;

    return (count ? <div className="badge">{count}</div> : '');
  }
}
