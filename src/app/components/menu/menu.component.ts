import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {IOrder} from "../../common/interfaces/order.interface";
import {selectOrder} from "../../store/selectors/order.selector";
import {Store} from "@ngrx/store";
import {updateWorkingOrder} from "../../store/actions/order.actions";
import {Subscription} from "rxjs";
import {IMenu, Item} from "../../common/interfaces/menu.interface";
import {State} from "../../store/reducers/order.reducer";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription;
  menu: IMenu[];
  selectedItems: Item[];
  order: IOrder | null;

  constructor(private router: Router,
              private store: Store<{ data: State }>) {
    this.subscriptions = new Subscription();
    this.menu = [
      {
        label: 'Breakfast',
        items: [
          {
            name: 'eggs',
            price: 10
          },
          {
            name: 'roast beef sandwich',
            price: 15
          },
          {
            name: 'salad',
            price: 5
          }
        ]
      },
      {
        label: 'Lunch',
        items: [
          {
            name: 'steak',
            price: 20
          },
          {
            name: 'lamb chops',
            price: 30
          },
          {
            name: 'chicken roast',
            price: 15
          },
          {
            name: 'french fries',
            price: 7
          }
        ]
      },
      {
        label: 'Dinner',
        items: [
          {
            name: 'fish',
            price: 30
          },
          {
            name: 'spaghetti',
            price: 13
          },
          {
            name: 'sea food',
            price: 45
          }
        ]
      },
      {
        label: 'Deserts',
        items: [
          {
            name: 'cake',
            price: 10
          },
          {
            name: 'ice cream',
            price: 8
          },
          {
            name: 'waffel',
            price: 8
          }
        ]
      },
      {
        label: 'Drinks',
        items: [
          {
            name: 'soda',
            price: 5
          },
          {
            name: 'beer',
            price: 7
          },
          {
            name: 'lemonade',
            price: 3
          }
        ]
      }
      ];
    this.order = null;
    this.selectedItems = [];
  }

  ngOnInit(): void {
    this.subscriptions = this.store.select(selectOrder).subscribe( (order: IOrder) => {
      if (order) {
        this.order = order;
        this.selectedItems = order.items;
      }
    })
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  calcTotal(): number {
    return this.selectedItems.reduce( (acc, cur) => acc + cur.price, 0)
  }

  nextPage(): void {
    const order = {
      ...this.order,
      items: this.selectedItems,
      total: this.calcTotal()
    } as IOrder;
    this.store.dispatch(updateWorkingOrder(order));
    this.router.navigate(['order','order-summary'], { queryParams: { id: order.id }});
  }

}
