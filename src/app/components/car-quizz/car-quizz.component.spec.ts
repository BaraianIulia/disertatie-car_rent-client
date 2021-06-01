import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarQuizzComponent } from './car-quizz.component';

describe('CarQuizzComponent', () => {
  let component: CarQuizzComponent;
  let fixture: ComponentFixture<CarQuizzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarQuizzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
