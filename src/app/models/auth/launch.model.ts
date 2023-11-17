import {YearModel} from "../cycle/year.model";
import {Money} from "../base/money.model";
import {Id} from "../base/base.types";

export interface LaunchResponse {
  schoolId?: number,
  schoolIds?: number[],
  organisationId?: number,
  schoolData?: SchoolData,
  organisationData: OrganisationData
}

interface OrganisationData {
  stats: OrganisationStats
}

export interface OrganisationStats {
  numberOfSchools: number,
  numberOfStaff: number,
  numberOfStudents: number,
  numberOfApplications: number
}

export interface SchoolData {
  schoolName: string,
  stats: SchoolStats,
  academicYears: YearModel[]
  classLevels: LaunchClassLevelModel[]
}

export interface SchoolStats {
  numberOfTeachers: number,
  numberOfStudents: number,
  numberOfDepartments: number,
  numberOfSubjects: number
}

export interface LaunchClassLevelModel{
  id: Id,
  name: string
  section: string
  feeAmount: Money
  schoolId: Id
}
