import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css'],
})
export class ObservableComponent implements OnInit {
  public ob: Observable<string> | undefined;
  constructor() {}

  ngOnInit(): void {
    this.ob = new Observable<string>((observer) => {
      setTimeout(() => {
        observer.next('Karthikeyan');
      }, 5000);
      setTimeout(() => {
        observer.next('Ajit');
      }, 10000);
      setTimeout(() => {
        observer.next('Amod');
      }, 15000);
      setTimeout(() => {
        observer.complete();
      }, 20000);
    });
  }
  Sub1() {
    this.ob?.subscribe((val) => {
      console.log(`Subscriber1 received:${val}`);
    });
  }
  Sub2() {
    this.ob?.subscribe((val) => {
      console.log(`Subscriber2 received:${val}`);
    });
  }
  Sub3() {
    this.ob?.subscribe((val) => {
      console.log(`Subscriber3 received:${val}`);
    });
  }
}
