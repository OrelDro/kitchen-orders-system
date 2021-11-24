import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import { NewOrderComponent } from './components/new-order/new-order.component';
import {StepsModule} from 'primeng/steps';
import { TableSelectComponent } from './components/table-select/table-select.component';
import { MenuComponent } from './components/menu/menu.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from "@angular/forms";
import {CheckboxModule} from 'primeng/checkbox';
import {StoreModule} from "@ngrx/store";
import {orderReducer} from "./store/reducers/order.reducer";
import { OrderItemComponent } from './components/order-item/order-item.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NewOrderComponent,
    TableSelectComponent,
    MenuComponent,
    OrderSummaryComponent,
    OrderItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    DropdownModule,
    StepsModule,
    InputTextModule,
    FormsModule,
    CheckboxModule,
    StoreModule.forRoot({ data: orderReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
