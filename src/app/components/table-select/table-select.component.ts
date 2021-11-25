import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {IOrder} from "../../common/interfaces/order.interface";
import {Store} from "@ngrx/store";
import {selectOrder} from "../../store/selectors/order.selector";
import {updateWorkingOrder} from "../../store/actions/order.actions";
import {Subscription} from "rxjs";
import {State} from "../../store/reducers/order.reducer";

@Component({
  selector: 'app-table-select',
  templateUrl: './table-select.component.html',
  styleUrls: ['./table-select.component.scss']
})
export class TableSelectComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  selectTable: string;
  order: IOrder | null;

  constructor(private router: Router,
              private store: Store<{ data: State }>) {
    this.subscriptions = new Subscription();
    this.selectTable = '';
    this.order = null;
  }

  ngOnInit(): void {
    this.subscriptions = this.store.select(selectOrder).subscribe( (order: IOrder) => {
      if (order) {
        this.order = order;
        this.selectTable = order.table;
      }
    })
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  nextPage() {
    const order = {
      ...this.order,
      table: this.selectTable
    } as IOrder;
    this.store.dispatch(updateWorkingOrder(order));
    this.router.navigate(['order','menu'], { queryParams: { id: order.id }});
  }

}
