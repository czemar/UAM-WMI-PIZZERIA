import React from 'react';
import { Component } from 'react';
import './Badge.component.scss';

export class Badge extends Component<{ count: number }> {
  render() {
    const { count = 2 } = this.props;

    return <div className="badge">{count}</div>;
  }
}
