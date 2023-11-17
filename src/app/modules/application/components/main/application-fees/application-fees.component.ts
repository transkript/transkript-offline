import {Component, OnInit, Renderer2} from '@angular/core';
import {TrialService} from "../../../../../services/http/trial.service";
import {BaseFilter, SchoolBaseFilter} from "../../../../../config/filter/base.filter";
import {Subject, Subscription} from "rxjs";
import {FormControlModel} from "../../../../library/models/data/form-control.model";
import {FormModel} from "../../../../library/models/data/form.model";
import {TrialFilter, TrialFilterParams} from "../../../../../config/filter/trial.filter";
import {AbstractComponent} from "../../../../library/components/general/abstract.component";
import {YearModel} from "../../../../../models/cycle/year.model";
import {picon} from "../../../../../config/util/general.util";
import {PaymentRecordModel} from "../../../../../models/payment/payment-record.model";
import {DropdownChangeEvent} from "primeng/dropdown";
import {StudentApplicationTrialPayload} from "../../../../../models/student/student-application-trial.payload";
import {Currency, formatMoney} from "../../../../../models/base/money.model";
import {dateTimeFormat, displayDate} from "../../../../../config/util/date.util";
import {formatDate} from "@angular/common";
import {tuitionPaymentsSumAsMoney} from "../../../../../models/payment/payment-tuition.model";
import {PrintReceiptService} from "../../../../../services/util/print-receipt.service";
import {LSLanguage} from "../../../../../services/http/local-storage.service";
import {SchoolModel} from "../../../../../models/school/school.model";
import {LaunchClassLevelModel} from "../../../../../models/auth/launch.model";

@Component({
  selector: 'app-application-fees',
  templateUrl: './application-fees.component.html',
  styleUrl: './application-fees.component.scss'
})
export class ApplicationFeesComponent extends AbstractComponent implements OnInit {
  private dataLoad$?: Subscription;
  selectedYear?: YearModel;
  records: PaymentRecordModel[] = [];
  loadingStudentData = false;
  studentDetailsDialogVisible = false;
  selectedRecord?: PaymentRecordModel;
  printReceipt = 0;
  protected readonly formatMoney = formatMoney;
  protected readonly tuitionPaymentsSumAsMoney = tuitionPaymentsSumAsMoney;
  protected readonly displayDate = displayDate;


  selectedTrialDetail?: {
    payload?: StudentApplicationTrialPayload,
    record: PaymentRecordModel,
    school: SchoolModel,
  }

  constructor(
    private trialService: TrialService,
    private printReceiptService: PrintReceiptService,
    private renderer: Renderer2,
  ) {
    super();
  }

  ngOnInit() {
    this.jsonRepoDataAsync().then(data => this.records = data.paymentRecords ?? []);
  }

  get dbTrials() {
    return this.jsonRepoData?.trials ?? [];
  }
  get dbClassLevels() {
    return this.jsonRepoData?.classLevels ?? [];
  }
  get dbTrialLoadDate() {
    return displayDate(<any>formatDate(this.jsonRepoData?.trialLoadedAt ?? '', dateTimeFormat, LSLanguage()));
  }

  get selectedRecordTrial() {
    if (this.selectedRecord == undefined) return undefined;
    return this.dbTrials.find(t => t.studentApplicationTrial.id == this.selectedRecord?.trialId);
  }

  loadStudentAction() {
    this.loadingStudentData = true;
    const filter = new TrialFilter({
      schoolId: this.currentSchool?.id,
      academicYearId: this.selectedYear?.id
    });

    this.dataLoad$ = this.trialService.list(filter).subscribe(res => {
      this.loadingStudentData = false;
      this.jsonRepoService.updateAll([
        { key: "trials", data: res },
        { key: "trialLoadedAt", data: new Date() },
      ]).then();
    });
  }

  getSchoolYears = () => {
    const schoolId = this.jsonRepoData?.currentSchool?.id;
    if (schoolId==undefined) return [];
    return (this.jsonRepoData?.academicYears ?? []).filter(y=> y.schoolId == schoolId);
  }
  protected readonly picon = picon;

  dbUpdateRecords = () => {
    this.jsonRepoService.update("paymentRecords", this.records).then(data => {
      this.records = data.paymentRecords ?? [];
    });
  }

  addRecordEntry(v: number) {
    const newRecord: PaymentRecordModel = {
      name: '',
      identifier: '',
      classLevel: '',
      section: '',
      money: { amount: 0, currency: Currency.XAF.toUpperCase() },
      feeAmount: { amount: 0, currency: Currency.XAF.toUpperCase() },
    }
    this.records.push(newRecord);
    this.dbUpdateRecords();
  }

  dbTrialSelectAction($event: DropdownChangeEvent, record: PaymentRecordModel) {
    const trial = $event.value as StudentApplicationTrialPayload;

    if (!trial.studentApplicationTrial.id) return;
    record.classLevel = trial.classLevel;
    record.section = trial.section;
    record.name = trial.student.name ?? '';
    record.identifier = trial.student.accountId ?? '';
    record.trialId = trial.studentApplicationTrial.id;
    record.feeAmount = trial.tuitionPaymentStatus.feeAmount;
  }

  dbClassLevelSelectAction($event: DropdownChangeEvent, record: PaymentRecordModel) {
    const classLevel = $event.value as LaunchClassLevelModel;
    record.classLevel = classLevel.name;
    record.section = classLevel.section;
    record.feeAmount = classLevel.feeAmount;
    console.log(classLevel);
  }

  recordView = (record: PaymentRecordModel) => {
    this.dbUpdateRecords();
    this.selectedRecord = record;
    this.studentDetailsDialogVisible = true;
  }

  recordPrintReceipt = (record: PaymentRecordModel) => {
    this.dbUpdateRecords();
    this.selectedRecord = record;
    const selectedRecordTrial = this.selectedRecordTrial;
    this.selectedTrialDetail = {
      payload: selectedRecordTrial,
      record: record,
      school: this.currentSchool!
    }
    this.printReceipt++;
  }
  feeAmountForClassLevel(record: PaymentRecordModel) {
    if (!record.feeAmount) return '';
    return $localize `Fee amount for this class: ${formatMoney(record.feeAmount)}`;
  }
}

const SatFilterFormModel = new FormModel<TrialFilterParams>({
  academicYearId: new FormControlModel({
    label: $localize`Academic Year`,
    name: "academicYearId",
    type: "select",
  }),
  sectionId: new FormControlModel({
    label: $localize`Section`,
    name: "sectionId",
    type: "select",
  }),
  classLevelId: new FormControlModel({
    label: $localize`Class Level`,
    name: "classLevelId",
    type: "select",
  }),
});
