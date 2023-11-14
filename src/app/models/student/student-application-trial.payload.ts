import {SubjectRegistrationPayload} from "../subject/subject-registration.payload";
import {TuitionPaymentStatusModel} from "../payment/tuition-payment-status.model";
import {UserAccountModel} from "../user/user-account.model";
import {StudentApplicationModel} from "./student-application.model";

export interface StudentApplicationTrialPayload {
  classLevel: string
  section: string
  tuitionPaymentStatus: TuitionPaymentStatusModel
  registeredSubjects: SubjectRegistrationPayload[]
  student: UserAccountModel
  studentApplication: StudentApplicationModel;
  studentApplicationTrial: StudentApplicationModel;
}
