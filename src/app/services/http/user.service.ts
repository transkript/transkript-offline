import {Injectable} from '@angular/core';
import {AbstractHttpService} from "./abstract-http.service";
import {HttpClient} from "@angular/common/http";
import {UserPayload} from "../../models/user/user.payload";
import {Observable, tap} from "rxjs";
import {LocalStorageService, OrganisationId, SchoolId} from "./local-storage.service";
import {AppEndpoint} from "../../config/route/app.endpoint";

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractHttpService {

  constructor(private http: HttpClient, private localStorage: LocalStorageService) {
    super(http, AppEndpoint.USER)
  }

  getById = (userId: number): Observable<UserPayload> => {
    return this.http.get<UserPayload>(this.urlWithPath(`/id/${userId}`));
  }
  getByPrincipal = (): Observable<UserPayload> => {
    return this.http.get<UserPayload>(this.urlWithPath('/principal')).pipe(
      tap((payload) => {
        const organisationId = OrganisationId();
        const schoolId = SchoolId();
        if (organisationId < 1 && payload.account?.organisationId) {
          this.localStorage.set("organisation_id", payload.account.organisationId);
        }
        if (schoolId && schoolId < 1 && payload.account?.schoolId) {
          this.localStorage.set("school_id", payload.account.schoolId);
        }
      })
    );
  }
}
