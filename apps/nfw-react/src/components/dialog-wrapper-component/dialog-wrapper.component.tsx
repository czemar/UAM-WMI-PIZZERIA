import React, { Component, ReactNode } from "react";
import { Redirect } from "react-router-dom";
import './dialog-wrapper.component.scss';
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export class DialogWrapper extends Component<{
  title: string,
  footer?: ReactNode
}> {
  constructor(props) {
    super(props);

    this.slideIn = this.slideIn.bind(this);
    this.slideOut = this.slideOut.bind(this);
    this.close = this.close.bind(this);
  }

  state = {
    animation: null as 'slide-in' | 'slide-out',
    redirect: false as boolean
  }

  componentDidMount() {
    this.slideIn();
  }

  slideIn() {
    this.setState({ animation: 'slide-in' });
  }

  slideOut() {
    this.setState({ animation: 'slide-out' });
  }

  close() {
    this.slideOut();

    setTimeout(() => {
      this.setState({ redirect: true });
    }, 300);
  }

  render() {
    const { children, title, footer } = this.props;
    const { animation, redirect } = this.state;

    return (
      redirect ? 
      <Redirect to='/' />
      :
      <div className={classNames(['dialog', animation])}>
        <div className="dialog-background"></div>
        <div className="dialog-wrapper">
          <div className="dialog-header">
            <div className="title">{ title }</div>
            <div className="close-button" onClick={this.close}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
          <div className="dialog-content">
            { children }
          </div>
          <div className="dialog-footer">
            { footer }
          </div>
        </div>
      </div>
    );
  }
}
