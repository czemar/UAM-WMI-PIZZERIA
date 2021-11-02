import React, { Component } from 'react';
import { ReactiveControl } from '../../libs/reactive-forms/classes/reactive-control.class';
import { ISelectOption } from '../../interfaces/select-options.interface';
import { Subscription } from 'rxjs';
import './select.component.scss';

export class Select extends Component<{
  options: ISelectOption[],
  control: ReactiveControl<string | number>
}> {

  // -- subscriptions --
  private controlValueChangesSubscription?: Subscription;

  // -- state --
  public state = {
    control: null as ReactiveControl<string | number>
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
  public render() {
    const { options } = this.props;
    const { control } = this.state;

    return (
      <select value={ control.value } onChange={ (e) => control.setValue(e.target.value) } className="select">
        { options.map((option, index) => (
          <option key={ index } value={ option.value } className="option">{ option.label }</option>
        )) }
      </select>
    )
  }
}