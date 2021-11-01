import { Component } from 'react';
import { IRoute } from '../../interfaces/route.interface';
import { ActivatedRouteService } from '../../services/activated-route.service';

export class Page extends Component<{ route: IRoute }> {

  // -- dependencies --
  private readonly activatedRouteService: ActivatedRouteService = ActivatedRouteService.instance();

  componentDidMount() {
    const { route } = this.props;
    this.activatedRouteService.emitRouteChange(route);
  }

}
