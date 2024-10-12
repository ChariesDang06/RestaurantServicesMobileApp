import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderBillDetailsPage } from './order-bill-details.page';

describe('OrderBillDetailsPage', () => {
  let component: OrderBillDetailsPage;
  let fixture: ComponentFixture<OrderBillDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBillDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
