import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {NewOrderComponent} from "./components/new-order/new-order.component";
import {TableSelectComponent} from "./components/table-select/table-select.component";
import {MenuComponent} from "./components/menu/menu.component";
import {OrderSummaryComponent} from "./components/order-summary/order-summary.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent
  },
  {
    path: 'order',
    pathMatch: 'prefix',
    component: NewOrderComponent,
    children: [
      {
        path: 'table-select',
        component: TableSelectComponent
      },
      {
        path: 'menu',
        component: MenuComponent
      },
      {
        path: 'order-summary',
        component: OrderSummaryComponent
      }
    ]
  },
  {
    path: 'order/:id',
    pathMatch: 'full',
    component: NewOrderComponent,
    children: [
      {
        path: 'table-select',
        component: TableSelectComponent
      },
      {
        path: 'menu',
        component: MenuComponent
      },
      {
        path: 'order-summary',
        component: OrderSummaryComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
