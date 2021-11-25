import {Action, createReducer, on} from '@ngrx/store';
import {
  createNewOrder,
  getAllOrders,
  resetNewOrderSuccessInd,
  resetWorkingOrder,
  setWorkingOrder,
  updateIsEditMode,
  updateOrder,
  updateStatus, updateWorkingOrder
} from "../actions/order.actions";
import {IOrder} from "../../common/interfaces/order.interface";
import {TableStatus} from "../../common/enums/order.enum";

export interface State {
  nextId: number,
  orders: IOrder[],
  order: IOrder | null,
  isEditMode: boolean,
  addUpdateOrderSuccess: boolean,
  paySuccess: boolean
}

export const initialState = {
  nextId: 0,
  orders: [],
  order: null,
  isEditMode: false,
  addUpdateOrderSuccess: false,
  paySuccess: false
};

const _orderReducer = createReducer(
  initialState,
  on(getAllOrders, (state) => state),
  on(setWorkingOrder, (state: any, payload) => {
    const order = state.orders.find( (order: IOrder) => order.id === payload.id);
    return {...state, order};
  }),
  on(resetWorkingOrder, (state: any) => {
    const id = state.nextId;
    const order = {
      id,
      items: [],
      status: TableStatus.Active,
      total: 0,
      table: ""
    }
    return {...state, order};
  }),
  on(createNewOrder, (state: any, payload) => {
    const newOrder = {
      id: payload.id,
      items: payload.items,
      status: payload.status,
      table: payload.table,
      total: payload.total
    };
    const nextId = state.nextId + 1;
    return {...state, orders: [newOrder, ...state.orders], nextId, addUpdateOrderSuccess: true, paySuccess: false};
  }),
  on(updateWorkingOrder, (state: any, payload) => {
    const order = {
      ...state.order,
      id: payload.id,
      items: payload.items,
      status: payload.status,
      table: payload.table,
      total: payload.total
    };
    return {...state, order};
  }),
  on(updateOrder, (state: any, payload) => {
    const orders = state.orders.map( (order: IOrder) => (order.id === payload.id) ? {
      ...order,
      total: payload.total,
      table: payload.table,
      items: payload.items,
      status: payload.status
    } : order)
    return {...state, orders, addUpdateOrderSuccess: true};
  }),
  on(updateStatus, (state: any, payload) => {
    let payIndication = state.paySuccess;
    const orders = state.orders.map( (order: IOrder) => (order.id === payload.id) ? {
      ...order,
      status: payload.status
    } : order)
    if (payload.status === 0) {
      payIndication = true;
    }
    return {...state, orders, paySuccess: payIndication};
  }),
  on(resetNewOrderSuccessInd, (state) => {
    return {...state, addUpdateOrderSuccess: false};
  }),
  on(updateIsEditMode, (state, payload) => {
    return {...state, isEditMode: payload.editMode};
  })

);

export function orderReducer(state = initialState, action: Action) {
  return _orderReducer(state, action);
}
