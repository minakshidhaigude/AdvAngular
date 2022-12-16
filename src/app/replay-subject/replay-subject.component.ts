import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-replay-subject',
  templateUrl: './replay-subject.component.html',
  styleUrls: ['./replay-subject.component.css'],
})
export class ReplaySubjectComponent implements OnInit {
  public rs: ReplaySubject<string> | undefined;
  constructor() {}

  ngOnInit(): void {
    this.rs = new ReplaySubject<string>(2);
    setTimeout(() => {
      this.rs?.next('Replay Value1');
    }, 5000);
    setTimeout(() => {
      this.rs?.next('Replay Value2');
    }, 10000);
    setTimeout(() => {
      this.rs?.next('Replay Value3');
    }, 15000);
    setTimeout(() => {
      this.rs?.complete();
    }, 20000);
  }
  Sub1() {
    this.rs?.subscribe((val) => {
      console.log(`Subscriber1 received: ${val}`);
    });
  }
  Sub2() {
    this.rs?.subscribe((val) => {
      console.log(`Subscriber2 received: ${val}`);
    });
  }
  Sub3() {
    this.rs?.subscribe((val) => {
      console.log(`Subscriber3 received: ${val}`);
    });
  }
}
