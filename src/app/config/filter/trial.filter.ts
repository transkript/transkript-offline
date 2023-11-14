import {Id} from "../../models/base/base.types";
import {SchoolBaseFilter} from "./base.filter";

export interface TrialFilterParams {
  schoolId?: Id
  organisationId?: Id
  classLevelId?: Id
  sectionId?: Id
  academicYearId?: Id
  studentId?: Id
  studentName?: string
  studentIdentifier?: string
}

export class TrialFilter extends SchoolBaseFilter<TrialFilterParams> {
  constructor(public override params: TrialFilterParams, fill: boolean = true) {
    super(params, fill);
  }
}
