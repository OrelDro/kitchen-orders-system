import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {OrderService} from "../../common/services/order.service";
import {IOrder} from "../../common/interfaces/order.interface";
import {Store} from "@ngrx/store";
import {createNewOrder, resetNewOrderSuccessInd} from "../../store/actions/order.actions";
import {selectAddNewOrderSuccess} from "../../store/selectors/order.selector";

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  summary: IOrder;

  constructor(private router: Router,
              private store: Store<{ data: any }>,
              private orderService: OrderService) {
    this.summary = this.orderService.activeOrder;
    console.log(this.summary);
  }

  ngOnInit(): void {
    this.store.select(selectAddNewOrderSuccess).subscribe( (successIndication) => {
      if (successIndication) {
        this.store.dispatch(resetNewOrderSuccessInd());
        this.orderService.resetActiveOrder();
        this.router.navigate(['dashboard']);
      }
    });
  }

  confirmOrder() {
    this.store.dispatch(createNewOrder(this.summary));
  }

}
