import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {getAllOrders} from "../../store/actions/order.actions";
import {selectOrders} from "../../store/selectors/order.selector";
import {IOrder} from "../../common/interfaces/order.interface";
import {Observable} from "rxjs";
import {DialogService} from "primeng/dynamicdialog";
import {ReportComponent} from "../report/report.component";
import {State} from "../../store/reducers/order.reducer";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  orders$: Observable<IOrder[]>;
  title: string;

  constructor(private store: Store<{ data: State }>,
              private dialogService: DialogService) {
    this.title = 'Reali Restaurant';
    this.orders$ = new Observable<IOrder[]>();
    this.store.dispatch(getAllOrders());
  }

  ngOnInit(): void {
    this.orders$ = this.store.select(selectOrders);
  }

  openReport() {
    this.dialogService.open(ReportComponent, {
      header: 'Reports',
      width: '70%',
      data: {
        orders: this.orders$
      }
    });
  }

}
