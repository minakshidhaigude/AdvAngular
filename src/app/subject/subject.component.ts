import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
})
export class SubjectComponent implements OnInit {
  public subject: Subject<string> | undefined;
  constructor() {}

  ngOnInit(): void {
    this.subject = new Subject<string>();
    setTimeout(() => {
      this.subject?.next('SUBJECT VALUE1');
      console.log('subject emitted value1...');
    }, 5000);
    setTimeout(() => {
      this.subject?.next('SUBJECT VALUE2');
      console.log('subject emitted value2...');
    }, 10000);
    setTimeout(() => {
      this.subject?.next('SUBJECT VALUE3');
      console.log('subject emitted value3...');
    }, 15000);
    setTimeout(() => {
      this.subject?.complete();
      console.log('subject emission completed..');
    }, 20000);
  }
  Sub1() {
    this.subject?.subscribe((val) => {
      console.log(`Subscriber1 received:${val}`);
    });
  }
  Sub2() {
    this.subject?.subscribe((val) => {
      console.log(`Subscriber2 received:${val}`);
    });
  }
  Sub3() {
    this.subject?.subscribe((val) => {
      console.log(`Subscriber3 received:${val}`);
    });
  }
}
