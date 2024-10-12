import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserVoucherPage } from './user-voucher.page';

describe('UserVoucherPage', () => {
  let component: UserVoucherPage;
  let fixture: ComponentFixture<UserVoucherPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVoucherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
