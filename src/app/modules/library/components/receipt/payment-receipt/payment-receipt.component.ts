import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core'
import {StudentApplicationTrialPayload} from "../../../../../models/student/student-application-trial.payload";
import {PaymentRecordModel} from "../../../../../models/payment/payment-record.model";
import * as Handlebars from "handlebars";
import {paymentReceipt} from "../../../../../config/util/receipt/payment-receipt.util";
import {SchoolModel} from "../../../../../models/school/school.model";

@Component({
  selector: 'app-payment-receipt',
  templateUrl: './payment-receipt.component.html',
  styleUrl: './payment-receipt.component.scss'
})
export class PaymentReceiptComponent implements OnChanges {
  @ViewChild('receipt', {static: true}) containerRef?: ElementRef;
  @Input()
  print: boolean = false;
  @Input()
  trialDetail: {
    payload: StudentApplicationTrialPayload,
    record: PaymentRecordModel,
    school: SchoolModel,
  } | undefined;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const print = changes['print'];
    if (print && print.currentValue) {
      const containerElement: HTMLElement | undefined = this.containerRef?.nativeElement;
      const renderedHtml = containerElement?.innerHTML ?? '';
      console.log('Rendered HTML oqsijdoiqdoqnsdon:', renderedHtml);
      console.log(this.trialDetail);
      if (this.trialDetail) console.log(paymentReceipt(this.trialDetail));
    }
  }
}
