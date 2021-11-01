import { Subject, BehaviorSubject, OperatorFunction } from 'rxjs';
import isString from 'lodash-es/isString';
import { environment } from '../../environments/environment';
import { IResponse } from '../../interfaces/response.interface';
import { ESubjectStatus } from './subject-status.enum';

export class HttpSubject<T> extends BehaviorSubject<T> {

  public pipe = this.pipe as (...operations: OperatorFunction<any, any>[]) => HttpSubject<T>

  private _status: ESubjectStatus = ESubjectStatus.IDLE;

  private _rawSubject = new Subject<IResponse<T>>();
  private _errorSubject = new Subject<Error>();

  public readonly rawSubscribe = this._rawSubject.subscribe;

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
        this._status = ESubjectStatus.FINAL;
        this.next(json);
      })
      .catch((e) => {
        this._status = ESubjectStatus.CRASHED;
        this._errorSubject.next(e);
        this.error(e);
      });
  }

  public unsubscribe(): void {
    super.unsubscribe();
    this._rawSubject.complete();
    this._errorSubject.complete();
  }

  public catchError(operator: (err: Error) => void): HttpSubject<T> {
    this._errorSubject.subscribe(operator);
    return this;
  }

  public fetch(request: RequestInfo, init?: RequestInit) {
    if (isString(request)) request = environment.apiUrl + request;
    else request = new Request(environment.apiUrl + request.url, request);
    return this.pend(fetch(request, init));
  }
}
