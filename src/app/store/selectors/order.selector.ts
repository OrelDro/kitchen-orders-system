import { createSelector } from '@ngrx/store';

export const selectData = (state: any) => state.data;

export const selectOrders = createSelector(
  selectData,
  (state) => state.orders
);

export const selectAddNewOrderSuccess = createSelector(
  selectData,
  (state) => state.addNewOrderSuccess
);
