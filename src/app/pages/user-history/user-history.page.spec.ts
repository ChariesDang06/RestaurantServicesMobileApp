import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserHistoryPage } from './user-history.page';

describe('UserHistoryPage', () => {
  let component: UserHistoryPage;
  let fixture: ComponentFixture<UserHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
