import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-behavior-subject',
  templateUrl: './behavior-subject.component.html',
  styleUrls: ['./behavior-subject.component.css'],
})
export class BehaviorSubjectComponent implements OnInit {
  public bs: BehaviorSubject<string> | undefined;
  constructor() {}

  ngOnInit(): void {
    this.bs = new BehaviorSubject<string>('***Default***');
    setTimeout(() => {
      this.bs?.next('BEHAVIORSUBJECT VALUE1'), 5000;
    });
    setTimeout(() => {
      this.bs?.next('BEHAVIORSUBJECT VALUE2'), 10000;
    });
    setTimeout(() => {
      this.bs?.next('BEHAVIORSUBJECT VALUE3'), 15000;
    });
    setTimeout(() => {
      this.bs?.complete();
    }, 20000);
  }
  Sub1() {
    this.bs?.subscribe((val) => {
      console.log(`Subscriber1 received:${val}`);
    });
  }
  Sub2() {
    this.bs?.subscribe((val) => {
      console.log(`Subscriber2 received:${val}`);
    });
  }
  Sub3() {
    this.bs?.subscribe((val) => {
      console.log(`Subscriber3 received:${val}`);
    });
  }
}
