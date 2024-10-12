import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-bill',
  templateUrl: './order-bill.component.html',
  styleUrls: ['./order-bill.component.scss'],
})
export class OrderBillComponent implements OnInit {
  @Input() name: string = '';
  @Input() image: string = '';
  @Input() total: number = 0;
  @Input() price: number = 0;
  constructor() {}

  ngOnInit() {}
}
