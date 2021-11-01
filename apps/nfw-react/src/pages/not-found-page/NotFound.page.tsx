import React from 'react';
import { Page } from '../../libs/page/page.class';
import './not-found.page.scss';
import { translate } from '../../pipes/translate.pipe';
import { Link } from 'react-router-dom';
import { Button } from '../../components/button-component/button.component';

export class NotFoundPage extends Page {
  render() {
    return (
      <div className='not-found'>
        <p className='t-404'>404</p>
        <p className='description'>{translate('PAGE NOT FOUND')}</p>
        <Link to="/">
          <Button variant="secondary">{translate('Go to home page')}</Button>
        </Link>
      </div>
    );
  }
}
