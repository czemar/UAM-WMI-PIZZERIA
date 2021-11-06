import React, { Component, ReactElement } from 'react'
import { ReactiveControl } from '../../libs/reactive-forms/classes/reactive-control.class';
import { ICheckboxData } from '../../interfaces/checkbox-data.interface';
import Checkbox from '../checkbox-component/checkbox.component';
import { ReactiveArray } from '../../libs/reactive-forms/classes/reactive-array.class';
import { ReactiveGroup } from '../../libs/reactive-forms/classes/reactive-group.class';
import { Subscription } from 'rxjs';
import { IRadioData } from '../../interfaces/radio-data.interface';
import Radio from '../radio-component/radio.component';
import { mapValues } from 'lodash';
import { pairwise } from 'rxjs';
import { startWith } from 'rxjs';

export default class RadioList extends Component<{
  control: ReactiveControl<string>,
  radios: IRadioData[],
  template: (data: IRadioData) => ReactElement
}> {

  // -- subscriptions --
  private groupValueChangesSubscription: Subscription;

  // -- primitives --
  private previousValue: any;

  // -- state --
  public state = {
    group: new ReactiveGroup({})
  }

  // -- constructor --
  constructor(props) {
    super(props);

    const { radios } = this.props;

    const group = new ReactiveGroup(
      Object.assign({}, ...radios.map(
        radio => ({ [radio.id]: new ReactiveControl(false) })
      ))
    );

    this.state = { group };
  }

  // -- lifecycle methods --
  componentDidMount(): void {
    const { group } = this.state;
    const { control } = this.props;

    this.groupValueChangesSubscription = group.valueChanges.subscribe((value) => {
      const { previousValue } = this;

      console.log([previousValue, value]);
      if (previousValue && value) {
        Object.entries(value).forEach(([key, _]) => {
          if (previousValue?.[key] === true) {
            group.get(key).setValue(false, { emitValue: false });
          }
        });
      }
      control.setValue(group.value);
      this.previousValue = group.value;
      console.log(this.previousValue);
      this.setState({ group });
    });
  }

  componentWillUnmount(): void {
    this.groupValueChangesSubscription?.unsubscribe();
  }

  // -- render --
  render() {
    const { radios, template } = this.props;
    const { group } = this.state;

    return (
      <div>
        { radios.map(((radio) => (
          <Radio key={ radio.id } control={ group.get(radio.id) }>
            { template(radio) }
          </Radio>
        ))) }
      </div>
    )
  }
}
