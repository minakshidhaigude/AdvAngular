import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { interval, Subscription } from 'rxjs';
import { filter, map, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css'],
})
export class PracticeComponent implements OnInit {
  sub!: Subscription;
  dataArr = [
    { id: 1, name: 'Minakshi', gender: 'female' },
    { id: 2, name: 'Soham', gender: 'male' },
    { id: 3, name: 'Rugved', gender: 'male' },
    { id: 4, name: 'Pivu', gender: 'female' },
    { id: 5, name: 'Madhuri', gender: 'female' },
  ];
  source: any;
  constructor() {}

  ngOnInit(): void {
    // const broadcastVideos = interval(1000);
    // this.sub = broadcastVideos
    //   .pipe(map((mapData) => 'videos' + mapData))
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
    // setTimeout(() => {
    //   this.sub.unsubscribe();
    // }, 10000);

    // filter
    this.source = from(this.dataArr)
      .pipe(
        // filter((member) => member.name.length >= 7),
        filter((data) => data.gender == 'female'),
        toArray()
      )
      .subscribe((res) => {
        console.log('filtered arr by name length', res);
      });
  }
}
