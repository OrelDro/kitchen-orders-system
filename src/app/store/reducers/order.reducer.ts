import { createReducer, on } from '@ngrx/store';
import {
  createNewOrder,
  getAllOrders,
  resetNewOrderSuccessInd,
  updateOrder,
  updateStatus
} from "../actions/order.actions";
import {IOrder} from "../../common/interfaces/order.interface";

/*export interface State {
  orders: IOrder[];
  addNewOrderSuccess: boolean;
}*/

export const initialState = {
  orders: [],
  addNewOrderSuccess: false
};

const _orderReducer = createReducer(
  initialState,
  on(getAllOrders, (state) => state),
  on(createNewOrder, (state: any, payload) => {
    const newOrder = {
      id: payload.id,
      items: payload.items,
      status: payload.status,
      table: payload.table,
      total: payload.total
    };
    return {...state, orders: [newOrder, ...state.orders], addNewOrderSuccess: true};
  }),
  on(updateOrder, (state: any, payload) => {
    console.log(payload);
    const newOrder = {
      id: payload.id,
      items: payload.items,
      status: payload.status,
      table: payload.table,
      total: payload.total
    };
    return {...state};
  }),
  on(updateStatus, (state: any, payload) => {
    const orders = state.orders.map( (order: IOrder) => (order.id === payload.id) ? {
      ...order,
      status: payload.status
    } : order)
    return {...state, orders};
  }),
  on(resetNewOrderSuccessInd, (state) => {
    return {...state, addNewOrderSuccess: false};
  })

);

export function orderReducer(state: any, action: any) {
  return _orderReducer(state, action);
}
