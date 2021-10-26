import { Subject } from 'rxjs';
import isString from 'lodash-es/isString';
import { environment } from '../../environments/environment';
import { IResponse } from '../../interfaces/response.interface';
import { ESubjectStatus } from './subject-status.enum';

export class HttpSubject<T> extends Subject<T> {
  private _status: ESubjectStatus = ESubjectStatus.IDLE;

  private _rawSubject = new Subject<IResponse<T>>();
  public readonly subscribeRaw = this._rawSubject.subscribe;

  public get pending(): boolean {
    return this._status === ESubjectStatus.PENDING;
  }

  public get idle(): boolean {
    return this._status === ESubjectStatus.IDLE;
  }

  public get crashed(): boolean {
    return this._status === ESubjectStatus.CRASHED;
  }

  public pend(promise: Promise<IResponse<T>>) {
    this._status = ESubjectStatus.PENDING;
    promise
      .then((res) => {
        this._rawSubject.next(res);
        return res.json();
      })
      .then((json) => {
        this.next(json);
        this._status = ESubjectStatus.FINAL;
      })
      .catch((e) => {
        this._status = ESubjectStatus.CRASHED;
        console.error(e);
      });
  }

  public fetch(request: RequestInfo, init?: RequestInit) {
    if (isString(request)) request = environment.apiUrl + request;
    else request = new Request(environment.apiUrl + request.url, request);
    return this.pend(fetch(request, init));
  }
}
