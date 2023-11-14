import Handlebars from "handlebars";
import {dateTimeFormat, displayDate, today} from "../date.util";
import {formatDate} from "@angular/common";
import {LSLanguage} from "../../../services/http/local-storage.service";
import {StudentApplicationTrialPayload} from "../../../models/student/student-application-trial.payload";
import {PaymentRecordModel} from "../../../models/payment/payment-record.model";
import {tuitionPaymentsSumAsMoney} from "../../../models/payment/payment-tuition.model";
import {formatMoney} from "../../../models/base/money.model";
import {SchoolModel} from "../../../models/school/school.model";

const html=  `
    <!DOCTYPE html>
    <html lang="en, id">
    <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>
      Receipt
    </title>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
      rel="stylesheet"
    />
    <style>
      @import "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap";
      * {
        box-sizing: border-box;
      }

      body {
        font-family: 'Comfortaa', Arial, sans-serif;
        font-size: 0.56em;
        background-color: #dcdcdc;
        transform: scale(0.7,0.7);
        transform-origin: top left right;
        width: 100%
      }

      @page {
        size: landscape;
      }

      @media print {
        body {
          transform: scale(0.7,0.7);
          transform-origin: top left right;
        }

        .copyright {
          display: none;
        }
      }

      .wrapper-invoice .invoice {
        background: #fff;
        padding: 5vh;
        width: 100%;
        margin: auto;
        box-sizing: border-box;
        border: 1px solid #dcdcdc;
      }
      .invoice .invoice-information {
        text-align: right;
      }
      .wrapper-invoice .invoice .invoice-information b {
        color: #0F172A;
      }
      .wrapper-invoice .invoice .invoice-information p {
        font-size: 2vh;
        color: gray;
      }
      .wrapper-invoice .invoice .invoice-logo-brand h2 {
        text-transform: uppercase;
        font-size: 2.9vh;
        color: #0F172A;
      }
      .wrapper-invoice .invoice .invoice-logo-brand img {
        max-width: 100px;
        width: 100%;
        object-fit: fill;
      }
      .wrapper-invoice .invoice .invoice-head {
        display: flex;
        justify-content: space-between;
        margin-top: 4vh;
        width: 100%;
      }
      .wrapper-invoice .invoice .invoice-head .head {
        width: 100%;
        box-sizing: border-box;
      }
      .wrapper-invoice .invoice .invoice-head .client-info {
        text-align: left;
      }
      .wrapper-invoice .invoice .invoice-head .client-info h2 {
        font-weight: 500;
        letter-spacing: 0.3px;
        font-size: 2vh;
        color: "#0F172A";
      }
      .wrapper-invoice .invoice .invoice-head .client-info p {
        font-size: 2vh;
        color: gray;
      }
      .wrapper-invoice .invoice .invoice-head .client-data {
        text-align: right;
      }
      .wrapper-invoice .invoice .invoice-head .client-data h2 {
        font-weight: 500;
        letter-spacing: 0.3px;
        font-size: 2vh;
        color: "#0F172A";
      }
      .wrapper-invoice .invoice .invoice-head .client-data p {
        font-size: 2vh;
        color: gray;
      }
      .wrapper-invoice .invoice .invoice-body {
        margin-top: 8vh;
      }
      .wrapper-invoice .invoice .invoice-body .table {
        border-collapse: collapse;
        width: 100%;
      }
      .wrapper-invoice .invoice .invoice-body .table thead tr th {
        font-size: 2vh;
        border: 1px solid #dcdcdc;
        text-align: left;
        padding: 1vh;
        background-color: #eeeeee;
      }
      .wrapper-invoice .invoice .invoice-body .table tbody tr td {
        font-size: 2vh;
        border: 1px solid #dcdcdc;
        text-align: left;
        padding: 1vh;
        background-color: #fff;
      }
      .wrapper-invoice .invoice .invoice-body .table tbody tr td:nth-child(2) {
        text-align: right;
      }
      .wrapper-invoice .invoice .invoice-body .flex-table {
        display: flex;
      }
      .wrapper-invoice .invoice .invoice-body .flex-table .flex-column {
        width: 100%;
        box-sizing: border-box;
      }
      .wrapper-invoice .invoice .invoice-body .flex-table .flex-column .table-subtotal {
        border-collapse: collapse;
        box-sizing: border-box;
        width: 100%;
        margin-top: 2vh;
      }
      .wrapper-invoice .invoice .invoice-body .flex-table .flex-column .table-subtotal tbody tr td {
        font-size: 2vh;
        border-bottom: 1px solid #dcdcdc;
        text-align: left;
        padding: 1vh;
        background-color: #fff;
      }
      .wrapper-invoice .invoice .invoice-body .flex-table .flex-column .table-subtotal tbody tr td:nth-child(2) {
        text-align: right;
      }
      .wrapper-invoice .invoice .invoice-body .invoice-total-amount {
        margin-top: 1rem;
      }
      .wrapper-invoice .invoice .invoice-body .invoice-total-amount p {
        font-weight: bold;
        color: #0F172A;
        text-align: right;
        font-size: 2vh;
      }
      .wrapper-invoice .invoice .invoice-footer {
        margin-top: 4vh;
      }
      .wrapper-invoice .invoice .invoice-footer p {
        font-size: 1.7vh;
        color: gray;
      }

      .copyright p {
        color: gray;
        font-size: 1.8vh;
      }

      .rtl .invoice-information {
        float: left !important;
        text-align: left !important;
      }
      .rtl .invoice-head .client-info {
        text-align: right !important;
      }
      .rtl .invoice-head .client-data {
        text-align: left !important;
      }
      .rtl .invoice-body .table thead tr th {
        text-align: right !important;
      }
      .rtl .invoice-body .table tbody tr td {
        text-align: right !important;
      }
      .rtl .invoice-body .table tbody tr td:nth-child(2) {
        text-align: left !important;
      }
      .rtl .invoice-body .flex-table .flex-column .table-subtotal tbody tr td {
        text-align: right !important;
      }
      .rtl .invoice-body .flex-table .flex-column .table-subtotal tbody tr td:nth-child(2) {
        text-align: left !important;
      }
      .rtl .invoice-body .invoice-total-amount p {
        text-align: left !important;
      }
      .table.table-borderless thead th,
      .table.table-borderless tbody td {
        border: none;
        padding: 0.24rem;
      }
    </style>
  </head>
    <body>
    <section class="wrapper-invoice">
      <!-- switch mode rtl by adding class rtl on invoice class -->
      <div class="invoice">
        <!-- logo brand invoice -->
        <div class="invoice-logo-brand">
          <h2>{{value_school_name}}</h2>
        </div>
        <div class="invoice-information">
          <p><b>{{text_created_on}} </b>: {{value_created_on}}</p>
        </div>
        <!-- invoice head -->
        <div class="invoice-head row">
          <div class="head client-info col-6">
            <!-- school info -->
            <p>{{value_school_name}}</p>
            <p>{{value_school_code}}</p>
            <p>Cameroon</p>
          </div>
          <div class="head client-data col-6">
            <!-- invoice head -->
            <p>{{value_student_name}}</p>
            <p>{{value_student_identifier}}</p>
            <p>{{value_student_class_level}}</p>
          </div>
        </div>
        <!-- invoice body-->
        <div class="invoice-body">
          <table class="table">
            <thead>
              <tr>
                <th>{{text_payment_desc}}</th>
                <th>{{text_payment_amnt}}</th>
                <th>{{text_payment_date}}</th>
              </tr>
            </thead>
            <tbody>
            {{#each value_payments}}
              <tr>
                <td>{{desc}}</td>
                <td>{{amnt}}</td>
                <td>{{date}}</td>
              </tr>
            {{/each}}
            </tbody>
          </table>
          <div class="flex-table">
            <div class="flex-column"></div>
            <div class="flex-column">
              <table class="table-subtotal">
                <tbody>
                  <tr>
                    <td>{{text_fee_amount}}</td>
                    <td>{{value_fee_amount}}</td>
                  </tr>
                  <tr>
                    <td>{{text_fee_paid}}</td>
                    <td>{{value_fee_paid}}</td>
                  </tr>
                  <tr>
                    <td>{{text_fee_owed}}</td>
                    <td>{{value_fee_owed}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- invoice footer -->
        <div class="invoice-footer text-center">
          <p>___________________________</p>
          <p>{{text_signature}}</p>
        </div>
      </div>
    </section>
  </body>
    </html>
    `



export const paymentReceipt = (trialDetail: {
  payload: StudentApplicationTrialPayload,
  record: PaymentRecordModel,
  school: SchoolModel,
}) => {
  const payments = trialDetail.payload.tuitionPaymentStatus.payments;
  payments.push({
    money: trialDetail.record.money,
    paymentDate: <any>formatDate(today(), dateTimeFormat, LSLanguage()),
    paymentId: '',
    tuitionPaymentId: '',
  });
  const feeAmnt = formatMoney(trialDetail.payload.tuitionPaymentStatus.feeAmount);
  const feeOwed = formatMoney(trialDetail.payload.tuitionPaymentStatus.owed);
  const feePaid = tuitionPaymentsSumAsMoney(payments);

  const template = Handlebars.compile(html);

  return template({
    value_school_name: trialDetail.school.name,
    value_school_code: trialDetail.school.code ?? '',
    value_student_name: trialDetail.payload.student.name,
    value_student_identifier: trialDetail.payload.student.accountId,
    value_student_class_level:`${trialDetail.payload.classLevel} - ${trialDetail.payload.section}`,
    value_created_on: displayDate(<any>formatDate(today(), dateTimeFormat, LSLanguage())),
    value_fee_amount: feeAmnt,
    value_fee_owed: feeOwed,
    value_fee_paid: feePaid,
    value_payments: payments.map((p, index) => {
      return {
        desc: $localize `Payment ${index+1}`,
        date: displayDate(<any>p.paymentDate),
        amnt: formatMoney(p.money),
      }
    }),
    text_created_on: $localize`Created On`,
    text_payment_desc: $localize`Description`,
    text_payment_amnt: $localize`Amount`,
    text_payment_date: $localize`Date`,
    text_fee_amount: $localize`Sub Total`,
    text_fee_paid: $localize`Completed`,
    text_fee_owed: $localize`Remaining`,
    text_signature: $localize`Bursar's Signature`,
  });
}
