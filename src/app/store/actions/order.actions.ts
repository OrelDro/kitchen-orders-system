import {createAction, props} from '@ngrx/store';
import {IOrder} from "../../common/interfaces/order.interface";

export const getAllOrders = createAction('[Order Component] getAllOrders');

export const createNewOrder = createAction('[Order Component] createNewOrder', props<IOrder>());

export const resetNewOrderSuccessInd = createAction('[Order Component] resetNewOrderSuccessInd');

export const updateOrder = createAction('[Order Component] updateOrder', props<IOrder>());

export const updateStatus = createAction('[Order Component] updateStatus', props<{id: number, status: number }>());
