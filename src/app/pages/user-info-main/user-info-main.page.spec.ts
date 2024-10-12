import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserInfoMainPage } from './user-info-main.page';

describe('UserInfoMainPage', () => {
  let component: UserInfoMainPage;
  let fixture: ComponentFixture<UserInfoMainPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
