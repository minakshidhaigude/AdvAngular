import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-higher-order-mapping',
  templateUrl: './higher-order-mapping.component.html',
  styleUrls: ['./higher-order-mapping.component.css'],
})
export class HigherOrderMappingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    /* let ob = of(1, 2, 3).pipe(
      tap((val) => {
        console.log(val);
      }),
      map((val) => of('A', 'B', 'C'))
    );

    ob.subscribe((val) => {
      // console.log('values', val);
      val.subscribe((value) => console.log(value));
    });*/
    //using concatMap()
    let ob = of(1, 2, 3).pipe(
      tap((val) => console.log(val)),
      concatMap((val) => of('A', 'B', 'C'))
    );
    //subscribe only once
    ob.subscribe((val) => {
      console.log(val);
    });

    ////
    let count: number = 0;
    let sourceob: Observable<number> = new Observable<number>((observer) => {
      setTimeout(() => {
        observer.next(++count);
        console.log(`source observable emitted:${count}`);
      }, 1000);
      // setTimeout(() => {
      //   observer.complete();
      // }, 13000);
    });
    let targetob: Observable<string> = new Observable<string>((observer) => {
      setTimeout(() => {
        observer.next('HELLO');
      }, 5000);
      setTimeout(() => {
        observer.next('WELCOME');
      }, 10000);
      setTimeout(() => {
        observer.complete();
      }, 12000);
    });
    let result = sourceob.pipe(concatMap((val) => targetob));
    result.subscribe((val) => console.log('concatMap() sceniaro', val));
  }
}
