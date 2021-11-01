import React, { Component, ReactElement } from 'react'
import { ReactiveControl } from '../../libs/reactive-forms/classes/reactive-control.class';
import { ICheckboxData } from '../../interfaces/checkbox-data.interface';
import Checkbox from '../checkbox-component/checkbox.component';
import { ReactiveArray } from '../../libs/reactive-forms/classes/reactive-array.class';
import { ReactiveGroup } from '../../libs/reactive-forms/classes/reactive-group.class';
import { Subscription } from 'rxjs';

export default class CheckboxList extends Component<{
  control: ReactiveControl<boolean[]>,
  checkboxes: ICheckboxData[],
  template: (data: ICheckboxData) => ReactElement
}> {

  // -- subscriptions --
  private groupValueChangesSubscription: Subscription;

  // -- state --
  public state = {
    group: new ReactiveGroup({})
  }

  // -- constructor --
  constructor(props) {
    super(props);

    const { checkboxes } = this.props;

    const group = new ReactiveGroup(
      Object.assign({}, ...checkboxes.map(
        checkbox => ({ [checkbox.id]: new ReactiveControl(false) })
      ))
    );

    this.state = { group };
  }

  // -- lifecycle methods --
  componentDidMount(): void {
    const { group } = this.state;
    const { control } = this.props;

    this.groupValueChangesSubscription = group.valueChanges.subscribe((value) => {
      control.setValue(value);
    });
  }
  

  // -- render --
  render() {
    const { checkboxes, template } = this.props;
    const { group } = this.state;

    return (
      <div>
        { checkboxes.map(((checkbox) => (
          <Checkbox key={ checkbox.id } control={ group.get(checkbox.id) }>
            { template(checkbox) }
          </Checkbox>
        ))) }
      </div>
    )
  }
}
