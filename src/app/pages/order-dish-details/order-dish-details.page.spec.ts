import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderDishDetailsPage } from './order-dish-details.page';

describe('OrderDishDetailsPage', () => {
  let component: OrderDishDetailsPage;
  let fixture: ComponentFixture<OrderDishDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDishDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
