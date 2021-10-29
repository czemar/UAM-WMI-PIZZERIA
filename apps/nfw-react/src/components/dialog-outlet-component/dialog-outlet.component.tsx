import React, { Component } from "react";
import { Subscription } from "rxjs";
import { Dialog } from "../../libs/dialog/dialog.class";
import { DialogService } from "../../services/dialog.service";

export class DialogOutlet extends Component {

  private dialogService: DialogService = DialogService.instance();

  private openedDialogSubscription?: Subscription;

  state = {
    OpenedDialog: null as typeof Dialog
  }

  componentDidMount() {
    this.openedDialogSubscription = this.dialogService.openedDialog().subscribe(OpenedDialog => {
      this.setState({ OpenedDialog });
    });
  }

  componentWillUnmount() {
    this.openedDialogSubscription?.unsubscribe();
  }

  render() {
    const { OpenedDialog } = this.state;

    return (OpenedDialog ? <OpenedDialog /> : '');
  }
}
