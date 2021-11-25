import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IOrder} from "../../common/interfaces/order.interface";
import {TableStatus} from "../../common/enums/order.enum";
import {Store} from "@ngrx/store";
import {updateStatus} from "../../store/actions/order.actions";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {State} from "../../store/reducers/order.reducer";
import {selectPaySuccess} from "../../store/selectors/order.selector";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {

  @Input() order!: IOrder;
  tableStatus: {name: string, value: number}[];

  constructor(private store: Store<{ data: State }>,
              private messageService: MessageService,
              private router: Router) {
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
    this.store.select(selectPaySuccess).pipe(take(1)).subscribe( (ind: boolean) => {
      if (ind && this.order.status === 0) {
        this.successToastMessage('success', 'The order has been paid', 'We have closed the order.');
      }
    })
  }

  changeStatus(event: any): void {
    if (event.value.value === TableStatus.Pay || event.value.value === TableStatus.Cancel) {
      this.store.dispatch(updateStatus({id: this.order.id, status: event.value.value}));
    } else {
      this.router.navigate(['order/table-select'], { queryParams: { id: this.order.id }});
    }
  }

  successToastMessage(severity: string, summary: string, detail?: string): void {
    this.messageService.add({severity, summary, detail});
  }

}
