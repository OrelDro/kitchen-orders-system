import {Component, Input, OnInit} from '@angular/core';
import {IOrder} from "../../common/interfaces/order.interface";
import {TableStatus} from "../../common/enums/order.enum";
import {Store} from "@ngrx/store";
import {updateStatus} from "../../store/actions/order.actions";

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  @Input() order!: IOrder;
  tableStatus: {name: string, value: number}[];

  constructor(private store: Store<{ data: any }>) {
    this.tableStatus = [
      {
        name: 'Pay',
        value: TableStatus.Pay
      },
      {
        name: 'Cancel',
        value: TableStatus.Cancel
      },
      {
        name: 'Edit',
        value: TableStatus.Edit
      }
    ];
  }

  ngOnInit(): void {
  }

  changeStatus(event: any): void {
    console.log(event);
    this.store.dispatch(updateStatus({id: this.order.id, status: event.value.value}))
  }

}
