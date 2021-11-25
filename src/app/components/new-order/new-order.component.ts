import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {
  resetWorkingOrder, setWorkingOrder,
  updateIsEditMode,
} from "../../store/actions/order.actions";
import {Subscription} from "rxjs";
import {WizardItems, WizardRoutes} from "../../common/enums/wizard-items.enum";
import {State} from "../../store/reducers/order.reducer";

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  private firstLoad: boolean;
  title: string;
  items: MenuItem[];
  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<{ data: State }>) {
    this.firstLoad = true;
    this.subscriptions = new Subscription();
    this.title = 'Order';
    this.items = [
      {
        label: WizardItems.SelectTable,
        routerLink: WizardRoutes.SelectTable
      },
      {
        label: WizardItems.SelectItems,
        routerLink: WizardRoutes.SelectItems
      },
      {
        label: WizardItems.ConfirmOrder,
        routerLink: WizardRoutes.ConfirmOrder
      }
    ];
  }

  ngOnInit(): void {
    this.subscriptions = this.activatedRoute.queryParams.subscribe((params) => {
      if (this.firstLoad) {
        if (params.hasOwnProperty('id')) {
          const id = parseInt(params.id);
          this.store.dispatch(updateIsEditMode({editMode: true}));
          this.store.dispatch(setWorkingOrder({id}));
        } else {
          this.store.dispatch(updateIsEditMode({editMode: false}));
          this.store.dispatch(resetWorkingOrder());
        }
        this.firstLoad = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
