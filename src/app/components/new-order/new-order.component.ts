import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {

  title: string;
  items: MenuItem[];
  constructor() {
    this.title = 'Order';
    this.items = [
      {
        label: 'Select Table',
        routerLink: 'table-select'
      },
      {
        label: 'Select Items',
        routerLink: 'menu'
      },
      {
        label: 'Confirm Order',
        routerLink: 'order-summary'
      }
    ];
  }

  ngOnInit(): void {}

}
