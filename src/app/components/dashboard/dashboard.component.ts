import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {getAllOrders} from "../../store/actions/order.actions";
import {selectOrders} from "../../store/selectors/order.selector";
import {TableStatus} from "../../common/enums/order.enum";
import {IOrder} from "../../common/interfaces/order.interface";
import {Observable} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  orders$: Observable<IOrder[]>;
  title: string;

  constructor(private store: Store<{ data: any }>) {
    this.title = 'Reali Restaurant';
    this.orders$ = new Observable<IOrder[]>();
    this.store.dispatch(getAllOrders());
  }

  ngOnInit(): void {
    this.orders$ = this.store.select(selectOrders)
  }

}
