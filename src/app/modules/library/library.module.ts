import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterComponent} from "./components/data/filter/filter.component";
import {SharedModule} from "../shared.module";
import {LangSwitchComponent} from "./components/lang-switch/lang-switch.component";
import {PaymentReceiptComponent} from "./components/receipt/payment-receipt/payment-receipt.component";

@NgModule({
  declarations: [
    FilterComponent,
    LangSwitchComponent,
    PaymentReceiptComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    FilterComponent,
    LangSwitchComponent,
    PaymentReceiptComponent,
  ]
})
export class LibraryModule {
}
