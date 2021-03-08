import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilePictureChangeComponent } from './user-profile-picture-change.component';

describe('UserProfilePictureChangeComponent', () => {
  let component: UserProfilePictureChangeComponent;
  let fixture: ComponentFixture<UserProfilePictureChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfilePictureChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfilePictureChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
