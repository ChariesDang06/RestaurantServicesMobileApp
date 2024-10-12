import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserInfoEditingPage } from './user-info-editing.page';

describe('UserInfoEditingPage', () => {
  let component: UserInfoEditingPage;
  let fixture: ComponentFixture<UserInfoEditingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoEditingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
