import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderMainPage } from './order-main.page';

describe('OrderMainPage', () => {
  let component: OrderMainPage;
  let fixture: ComponentFixture<OrderMainPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
