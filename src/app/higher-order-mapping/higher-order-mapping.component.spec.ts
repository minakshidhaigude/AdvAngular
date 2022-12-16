import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HigherOrderMappingComponent } from './higher-order-mapping.component';

describe('HigherOrderMappingComponent', () => {
  let component: HigherOrderMappingComponent;
  let fixture: ComponentFixture<HigherOrderMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HigherOrderMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HigherOrderMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
