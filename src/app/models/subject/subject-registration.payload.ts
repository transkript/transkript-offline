import {SubjectModel} from "./subject.model";
import {SubjectRegistrationModel} from "./subject-registration.model";
import {StudentApplicationTrialModel} from "../student/student-application-trial.model";

export interface SubjectRegistrationPayload {
  subject: SubjectModel
  registration: SubjectRegistrationModel
  trial: StudentApplicationTrialModel
}
