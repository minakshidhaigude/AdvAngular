import { Component } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import { DemoService } from './demo.service';
import { combineLatest } from 'rxjs';
class Country {
  constructor(public id: number, public country: string) {}
}
class City {
  constructor(
    public id: number,
    public countryid: number,
    public city: string
  ) {}
}
let countries = [
  new Country(1, 'India'),
  new Country(2, 'Germany'),
  new Country(3, 'Australia'),
];
let cities = [
  new City(100, 1, 'Mumbai'),
  new City(101, 1, 'Pune'),
  new City(102, 2, 'Germany1'),
  new City(103, 3, 'Australia1'),
  new City(104, 2, 'Germany2'),
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public countriesStream: Observable<Country[]> | undefined;
  public citiesStream: Observable<City[]> | undefined; //data stream
  public filteredcities: Observable<City[]> | undefined;
  public selectedcountryid: string = '';
  public SelectCountrySubject = new BehaviorSubject<string>('');
  public selectedCountryAction = this.SelectCountrySubject.asObservable(); //action stream
  title = 'AdvAngular';
  sub1: Subscription | undefined;
  ob: Observable<string> | undefined;

  OnCountrySelected(e: any) {
    console.log('countryid:', e.target.value);
    this.selectedcountryid = e.target.value;
    this.SelectCountrySubject.next(this.selectedcountryid);
  }

  constructor(private svc: DemoService) {
    console.log('constructor called');
    //create the observable stream like conveyor belt example
    this.ob = new Observable<any>((observer) => {
      console.log('observable callback called');
      //emit the data into stream like ( u observe)
      //make an HTTP request, wait for the response
      //call the next() method on the observer and emit the response into the stream

      setTimeout(() => {
        observer.next('Minakshi');
      }, 2000);

      setTimeout(() => {
        observer.next('Nikhil');
      }, 4000);

      setTimeout(() => {
        observer.complete();
      }, 6000);

      /* observer.next(100);
      observer.next('Minakshi');
      observer.next({ id: 1, name: 'Nikhil' });
      observer.next(true);
      observer.next(100.4);
      observer.complete();*/
    });
  }
  ngOnInit() {
    this.countriesStream = of(countries);
    this.citiesStream = of(cities);
    this.filteredcities = combineLatest([
      this.citiesStream,
      this.selectedCountryAction,
    ]).pipe(
      tap(([cities, selectedcountryid]) =>
        console.log(`selected country is:${selectedcountryid}`)
      ),
      map(([cities, selectedcountryid]) => {
        return cities.filter((city) =>
          selectedcountryid ? city.countryid === +selectedcountryid : true
        );
      })
    );
  }
  GetData() {
    const observer = {
      next: (data: any) =>
        console.log(`next callback of GetData invoked. Data is ${data}`),
      error: (error: any) => console.log(error),
      complete: () => console.log('GetData completed'),
    };
    this.sub1 = this.svc.GetData().subscribe(observer);
  }
  UnsubscribeGetData() {
    this.sub1?.unsubscribe();
  }
  GetMoreData() {
    const observer = {
      next: (data: any) =>
        console.log(`next callback of GetMoreData invoked. Data is ${data}`),
      complete: () => console.log('GetMoreData completed'),
    };

    this.svc.GetMoreData().subscribe(observer);
  }
  SimulateError() {
    const observer = {
      next: (data: any) =>
        console.log(`next callback of SimulateError invoked. Data is ${data}`),
      error: (error: any) => console.log(error),
      complete: () => console.log('SimulateError completed'),
    };
    this.svc.SimulateError().subscribe(observer);
  }
  subscribe() {
    //create an observer --> 1.way
    /* const observer = {
      next: (data: any) =>
        console.log(`next callback called.data is ${JSON.stringify(data)} `),
      error: (error: any) =>
        console.log(`error callback called.error is ${error}`),
      complete: () => console.log(`complete callback called`),
    };*/
    //subscribe to the stream so that emission starts
    //this.ob?.subscribe(observer);

    // --> 2.way of creating observer
    this.ob?.subscribe(
      (data: any) =>
        console.log(`next callback called.data is ${JSON.stringify(data)} `),
      (error: any) => console.log(`error callback called.error is ${error}`),
      () => console.log(`complete callback called`)
    );
  }
  OfObservable() {
    let observer = {
      next: (data: any) => console.log(`OfObservable --> Data is:${data}`),
      error: (error: any) => console.log(`OfObservable--> Data is:${error}`),
      complete: () => console.log(`OfObservable -->Completed`),
    };
    this.svc.CreateObservableOf().subscribe(observer);
  }
  FromObservable() {
    let observer = {
      next: (data: any) => console.log(`FromObservable --> Data is:${data}`),
      error: (error: any) => console.log(`FromObservable--> Data is:${error}`),
      complete: () => console.log(`FromObservable -->Completed`),
    };
    this.svc.CreateObservableFrom().subscribe(observer);
  }
  FromInterval() {
    let observer = {
      next: (data: any) => console.log(`FromInterval --> Data is:${data}`),
      error: (error: any) => console.log(`FromInterval--> Data is:${error}`),
      complete: () => console.log(`FromInterval -->Completed`),
    };
    this.sub1 = this.svc.CreateObservableInterval().subscribe(observer);
  }
  UnsubscribeFromInterval() {
    this.sub1?.unsubscribe();
  }
  GetLocations() {
    let observer = {
      next: (data: any) => console.log(`Location as it is:${data}`),
    };
    this.svc.GetAllLocations().subscribe(observer);
  }
  GetLocationsUpeer() {
    let observer = {
      next: (data: any) => console.log(`Location in uppercase:${data}`),
    };
    // this.svc
    //   .GetAllLocations()
    //   .pipe(map(this.ConvertToUppercase))
    //   .subscribe(observer);
    let uppercaseobservable = this.svc
      .GetAllLocations()
      .pipe(map(this.ConvertToUppercase));
    uppercaseobservable.subscribe(observer);
  }
  private ConvertToUppercase(location: string) {
    return location.toUpperCase();
  }
}
