import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderPaymentsPage } from './order-payments.page';

describe('OrderPaymentsPage', () => {
  let component: OrderPaymentsPage;
  let fixture: ComponentFixture<OrderPaymentsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPaymentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
