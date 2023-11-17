import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core'
import {StudentApplicationTrialPayload} from "../../../../../models/student/student-application-trial.payload";
import {PaymentRecordModel} from "../../../../../models/payment/payment-record.model";
import {paymentReceipt} from "../../../../../config/util/receipt/payment-receipt.util";
import {SchoolModel} from "../../../../../models/school/school.model";
import {PrintHtmlService} from "../../../../../services/http/print-html.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-payment-receipt',
  templateUrl: './payment-receipt.component.html',
  styleUrl: './payment-receipt.component.scss'
})
export class PaymentReceiptComponent implements OnChanges {
  @ViewChild('receipt', {static: true}) containerRef?: ElementRef;
  @Input()
  print = 0;
  @Input()
  printSub: Subject<boolean> = new Subject<boolean>();
  @Input()
  trialDetail: {
    payload?: StudentApplicationTrialPayload,
    record: PaymentRecordModel,
    school: SchoolModel,
  } | undefined;

  constructor(private printHtml: PrintHtmlService) {
    this.printSub.subscribe(d => console.log(d))
  }

  ngOnChanges(changes: SimpleChanges) {
    const print = changes['print'];
    if (print && print.currentValue > 0) {
      if (this.trialDetail) {
        const receiptHtml = paymentReceipt(this.trialDetail);
        this.printHtml.print({name: "doc", html: receiptHtml}).subscribe(res => {
          console.log(res)
        });
      }
    }
  }
}
