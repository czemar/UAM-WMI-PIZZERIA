import React from 'react';
import { Dialog } from '../../libs/dialog/dialog.class';
import { DialogWrapper } from '../../components/dialog-wrapper-component/dialog-wrapper.component';
import { translate } from '../../pipes/translate.pipe';

export class SuccessDialog extends Dialog {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <DialogWrapper title={translate('Success')}>
        <p>Zamównienie udane</p>
      </DialogWrapper>
    );
  }
}