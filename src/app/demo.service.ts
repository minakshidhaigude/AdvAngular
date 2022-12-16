import { Injectable } from '@angular/core';
import { from, interval, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  private counter: number = 0;
  constructor() {}
  public GetData(): Observable<string> {
    console.log('GetData() called');
    let ob = new Observable<string>((subscriber) => {
      console.log('GetData observable callback called');
      setInterval(() => {
        subscriber.next(`GetData()--> ${++this.counter}`);
      }, 2000);
    });
    return ob;
  }
  public GetMoreData(): Observable<string[]> {
    console.log('GetMoreData() called');
    let ob = new Observable<string[]>((subscriber) => {
      console.log('GetMoreData observable callback called');

      setTimeout(() => {
        subscriber.next(['HELLO', 'WELCOME', 'BYE']);
      }, 5000);
      setTimeout(() => {
        subscriber.complete();
      }, 6000);
    });
    return ob;
  }
  public SimulateError(): Observable<number> {
    console.log('SimulateError() called');
    let ob = new Observable<number>((subscriber) => {
      console.log('SimulateError observable callback called');

      setTimeout(() => {
        subscriber.next(100);
      }, 2000);
      setTimeout(() => {
        subscriber.next(200);
      }, 3000);
      setTimeout(() => {
        subscriber.error('SOMETHING HAPPENED');
      }, 5000);
    });

    return ob;
  }
  public CreateObservableOf(): Observable<any> {
    let stream: Observable<any> = of(10, 20, 30, 40, 50, [1, 2, 3, 4]);
    return stream;
  }
  public CreateObservableFrom(): Observable<string[]> {
    // let stream: Observable<string> = from([
    //   'Hello',
    //   'Welcome',
    //   'Bye',
    //   ...['Minakshi', 'Nikhil', 'Priyanka'],
    // ]);  //6 emissions
    let stream: Observable<string[]> = from([
      ['Minakshi', 'Nikhil'],
      ['Soham', 'Shreya'], //2 emmisions
    ]);
    return stream;
  }
  public CreateObservableInterval(): Observable<any> {
    let stream = interval(2000);
    return stream;
  }
  GetAllLocations(): Observable<string> {
    return of('Mumbai', 'Bengaluru', 'Pune');
  }
}
