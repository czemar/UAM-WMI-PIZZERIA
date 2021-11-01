import React, { Component } from 'react';
import './checkbox.component.scss';
import { ReactiveControl } from '../../libs/reactive-forms/classes/reactive-control.class';
import { Subscription } from 'rxjs';

export default class Checkbox extends Component<{
  control: ReactiveControl<boolean>
}> {

  // -- subscriptions --
  private controlValueChangesSubscription?: Subscription;

  // -- state --
  public state = {
    control: null as ReactiveControl<boolean>
  }

  // -- constructor --
  constructor(props) {
    super(props);

    const { control } = this.props;
    this.state = { control };
  }

  // -- lifecycle methods --
  componentDidMount(): void {
    const { control } = this.props;

    this.controlValueChangesSubscription = control.valueChanges.subscribe(() => {
      this.setState({ control });
    });
  }
  
  componentWillUnmount(): void {
    this.controlValueChangesSubscription?.unsubscribe();
  }

  // -- render --
  render() {
    const { children } = this.props;
    const { control } = this.state;

    return (
      <label className="checkbox">
        <input
          className="checkbox-input"
          type="checkbox"
          checked={ control.value }
          onChange={ (e) => control.setValue(e.target.checked) }
        />
        <span className="checkbox-checkmark-box">
          <span className="checkbox-checkmark"></span>
        </span>
        { children }
      </label>
    )
  }
}
