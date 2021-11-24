import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {OrderService} from "../../common/services/order.service";

@Component({
  selector: 'app-table-select',
  templateUrl: './table-select.component.html',
  styleUrls: ['./table-select.component.scss']
})
export class TableSelectComponent implements OnInit {

  selectTable: string;

  constructor(private router: Router,
              private orderService: OrderService) {
    this.selectTable = '';
  }

  ngOnInit(): void {
  }

  nextPage() {
    this.orderService.activeOrder.table = this.selectTable;
    this.router.navigate(['order/menu']);
  }

}
