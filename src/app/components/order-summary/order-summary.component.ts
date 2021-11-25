import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {IOrder} from "../../common/interfaces/order.interface";
import {Store} from "@ngrx/store";
import {createNewOrder, resetNewOrderSuccessInd, updateOrder} from "../../store/actions/order.actions";
import {
  selectAddNewOrderSuccess,
  selectIsEditMode,
  selectOrder
} from "../../store/selectors/order.selector";
import {Subscription} from "rxjs";
import {State} from "../../store/reducers/order.reducer";

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  summary: IOrder | null;
  isEditMode: boolean;

  constructor(private router: Router,
              private store: Store<{ data: State }>) {
    this.subscriptions = new Subscription();
    this.isEditMode = false;
    this.summary = null;
  }

  ngOnInit(): void {
    this.subscriptions.add(this.store.select(selectOrder).subscribe( (order: IOrder) => {
      if (order) {
        this.summary = order;
      }
    }));
    this.subscriptions.add(this.store.select(selectAddNewOrderSuccess).subscribe( (successIndication) => {
      if (successIndication) {
        this.store.dispatch(resetNewOrderSuccessInd());
        this.router.navigate(['dashboard']);
      }
    }));
    this.subscriptions.add(this.store.select(selectIsEditMode).subscribe( (isEditMode: boolean) => {
      this.isEditMode = isEditMode;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  confirmOrder() {
    const order = this.summary as IOrder;
    if (this.isEditMode) {
      this.store.dispatch(updateOrder(order));
    } else {
      this.store.dispatch(createNewOrder(order));
    }
  }

}
