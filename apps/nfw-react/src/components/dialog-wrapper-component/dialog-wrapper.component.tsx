import React, { Component } from "react";
import './dialog-wrapper.component.scss';

export class DialogWrapper extends Component<{
  title: string
}> {
  render() {
    const { children, title } = this.props;

    return (
      <div className="dialog">
        <div className="dialog-header">
          <div className="title">{ title }</div>
        </div>
        <div className="dialog-content">
          { children }
        </div>
      </div>
    );
  }
}
