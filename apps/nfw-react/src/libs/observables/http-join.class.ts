import { forkJoin, catchError } from 'rxjs';
import { HttpSubject } from './http-subject.class';
import { map } from 'rxjs/operators';

export function httpJoin(subjects: { [key: string]: HttpSubject<any> }) {

  const errors: Error[] = [];

  for (const [key, subject] of Object.entries(subjects)) {
    subject.pipe(
      map(() => {
        throw 'TEST'
      }),
      catchError((err) => {
        errors.push(err);
        throw err;
      }
    ));
  }

  return forkJoin(subjects).pipe(
    map((result) => {
      if (errors.length) {
        throw errors;
      }
      return result;
    }),
    catchError((e) => {
      throw e;
    })
  )

}