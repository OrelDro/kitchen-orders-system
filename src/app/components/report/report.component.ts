import { Component, OnInit } from '@angular/core';
import {IOrder} from "../../common/interfaces/order.interface";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Observable, zip} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  totalRevenue: number;
  payedOrders: IOrder[];
  canceledOrders: IOrder[];
  constructor(private ref: DynamicDialogRef,
              private config: DynamicDialogConfig) {
    const orders$: Observable<IOrder[]> = this.config.data.orders;
    this.payedOrders = [];
    this.canceledOrders = [];
    this.totalRevenue = 0;
    zip(
      orders$.pipe(map((orders) => orders.filter( order => order.status === 0))),
      orders$.pipe(map((orders) => orders.filter( order => order.status === 1))),
    ).subscribe( (reports) => {
      const [payedOrders, canceledOrders] = reports;
      this.payedOrders = payedOrders;
      this.canceledOrders = canceledOrders;
      this.totalRevenue = payedOrders.reduce((acc, cur) => acc + cur.total, 0);
    });
  }

  ngOnInit(): void {
  }

}
