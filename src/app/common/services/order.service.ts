import { Injectable } from '@angular/core';
import {IOrder} from "../interfaces/order.interface";
import {TableStatus} from "../enums/order.enum";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  id: number;
  private _activeOrder: IOrder;

  constructor() {
    this.id = 0;
    this._activeOrder = {
      id: 0,
      items: [],
      status: TableStatus.Active,
      total: 0,
      table: ""
    };
  }

  get activeOrder(): IOrder {
    return this._activeOrder;
  }

  set activeOrder(value: IOrder) {
    this._activeOrder = value;
  }

  resetActiveOrder() {
    this._activeOrder = {
      id: ++this.id,
      items: [],
      status: TableStatus.Active,
      total: 0,
      table: ""
    };
  }
}
