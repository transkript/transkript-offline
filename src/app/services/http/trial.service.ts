import { Injectable } from '@angular/core';
import {AbstractHttpService} from "./abstract-http.service";
import {HttpClient} from "@angular/common/http";
import {StudentApplicationTrialModel} from "../../models/student/student-application-trial.model";
import {StudentApplicationTrialPayload} from "../../models/student/student-application-trial.payload";
import {AppEndpoint} from "../../config/route/app.endpoint";
import {SchoolId} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class TrialService extends AbstractHttpService<StudentApplicationTrialModel, StudentApplicationTrialPayload> {
  constructor(private http: HttpClient) {
    super(http, AppEndpoint.STUDENT_APPLICATION_TRIAL, () => `/school/${SchoolId()}`);
  }
}
