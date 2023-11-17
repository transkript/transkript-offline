import {Injectable} from '@angular/core';
import {AbstractHttpService} from "./abstract-http.service";
import {HttpClient} from "@angular/common/http";
import {LoginRequestModel, LoginResponseModel} from "../../models/auth/login.model";
import {Observable, Subject, tap} from "rxjs";
import {AppEndpoint} from "../../config/route/app.endpoint";
import {LaunchResponse} from "../../models/auth/launch.model";
import {LocalStorageService, SchoolId} from "./local-storage.service";
import {LaunchFilter} from "../../config/filter/launch.filter";
import {UserService} from "./user.service";
import {isValidId} from "../../config/util/general.util";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AbstractHttpService {

  constructor(private http: HttpClient, private userService: UserService, private localStorage: LocalStorageService) {
    super(http)
  }

  login = (request: LoginRequestModel): Observable<LoginResponseModel> => {
    return this.http.post<LoginResponseModel>(AppEndpoint.AUTH_LOGIN.url, request).pipe(
      tap(response => {

      })
    );
  }


  launch = (filter: LaunchFilter | null = null): Observable<LaunchResponse> => {
    if (filter == null) {
      filter = new LaunchFilter({schoolId: SchoolId()});
    }
    const response = new Subject<LaunchResponse>();
    this.userService.getByPrincipal().subscribe((res) => {
      if (isValidId(res.account?.schoolId)) {
        this.localStorage.set("school_id", res.account?.schoolId);
      }
      this.localStorage.set("organisation_id", String(res.account?.organisationId));
    })
    this.http.get<LaunchResponse>(AppEndpoint.AUTH_LAUNCH.url, {
      params: filter?.parameters
    }).subscribe(res => {
      response.next(res);
      response.complete();
      if (isValidId(res.schoolId)) {
        this.localStorage.set("school_id", res.schoolId);
      }
      this.localStorage.set("organisation_id", String(res.organisationId));
    });
    return response.asObservable();
  }
}
