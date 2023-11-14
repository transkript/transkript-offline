import {YearModel} from "../cycle/year.model";

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
}

export interface SchoolStats {
  numberOfTeachers: number,
  numberOfStudents: number,
  numberOfDepartments: number,
  numberOfSubjects: number
}
