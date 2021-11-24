import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {OrderService} from "../../common/services/order.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu: any[];
  selectedItems: any[];

  constructor(private router: Router,
              private orderService: OrderService) {
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
    this.selectedItems = [];
  }

  ngOnInit(): void {
  }

  calcTotal(): number {
    return this.selectedItems.reduce( (acc, cur) => acc + cur.price, 0)
  }

  nextPage(): void {
    console.log(this.selectedItems);
    this.orderService.activeOrder.items = this.selectedItems;
    this.orderService.activeOrder.total = this.calcTotal();
    this.router.navigate(['order/order-summary'])
  }

}
