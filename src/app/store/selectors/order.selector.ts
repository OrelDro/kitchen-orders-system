import { createSelector } from '@ngrx/store';

export const selectData = (state: any) => state.data;

export const selectOrders = createSelector(
  selectData,
  (state) => state.orders
);

export const selectOrder = createSelector(
  selectData,
  (state) => state.order
);

export const selectAddNewOrderSuccess = createSelector(
  selectData,
  (state) => state.addUpdateOrderSuccess
);

export const selectIsEditMode = createSelector(
  selectData,
  (state) => state.isEditMode
);

export const selectPaySuccess = createSelector(
  selectData,
  (state) => state.paySuccess
);
