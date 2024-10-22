import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataTestPage } from './data-test.page';

describe('DataTestPage', () => {
  let component: DataTestPage;
  let fixture: ComponentFixture<DataTestPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
