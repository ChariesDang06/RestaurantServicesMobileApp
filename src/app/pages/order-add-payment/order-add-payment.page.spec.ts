import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderAddPaymentPage } from './order-add-payment.page';

describe('OrderAddPaymentPage', () => {
  let component: OrderAddPaymentPage;
  let fixture: ComponentFixture<OrderAddPaymentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAddPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
