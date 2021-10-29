import { Component } from "react";
import { Subscription } from "rxjs";

export class UniversalComponent extends Component {

  public readonly subscriptions: Subscription[] = [];

  componentWillUnmount() {
    for (const subscription of this.subscriptions) {
      subscription?.unsubscribe();
    }
  }

}
