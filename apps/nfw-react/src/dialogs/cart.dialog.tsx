import React from 'react';
import { DialogWrapper } from "../components/dialog-wrapper-component/DialogWrapper.component";
import { Dialog } from "../libs/dialog/dialog.class";

export class CartDialog extends Dialog {
  render() {
    return (
      <DialogWrapper title="Cart">
        <div>Hello</div>
      </DialogWrapper>
    );
  }
}
