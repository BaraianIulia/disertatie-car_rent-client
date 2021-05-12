import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentConfirmedComponent } from './rent-confirmed.component';

describe('RentConfirmedComponent', () => {
  let component: RentConfirmedComponent;
  let fixture: ComponentFixture<RentConfirmedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentConfirmedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
