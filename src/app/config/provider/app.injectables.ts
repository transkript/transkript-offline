import {Renderer2, Type} from "@angular/core";
import {AbstractHttpService} from "../../services/http/abstract-http.service";
import {TrialService} from "../../services/http/trial.service";
import {HTTP_INTERCEPTORS, HttpClient, HttpHandler} from "@angular/common/http";
import {AuthInterceptor} from "../interceptor/auth.interceptor";
import {ErrorInterceptor} from "../interceptor/error.interceptor";
import {ConfirmationService, MessageService} from "primeng/api";

type HttpAppServiceInjectable = { provide: Type<AbstractHttpService>, useClass: Type<AbstractHttpService> }

const httpAppServiceInjectables: HttpAppServiceInjectable[] = [
  {provide: TrialService, useClass: TrialService}
];

const interceptorInjectable = (interceptorType: Type<any>) => {
  return {provide: HTTP_INTERCEPTORS, useClass: interceptorType, multi: true}
}

const angularServiceInjectables = [
  interceptorInjectable(AuthInterceptor),
  interceptorInjectable(ErrorInterceptor),
  {provide: Renderer2, useClass: Renderer2},
];
const primengServiceInjectables: Array<any> = [
  {provide: MessageService, useClass: MessageService},
  {provide: ConfirmationService, useClass: ConfirmationService},
];

export const AppServiceInjectables = [
  ...angularServiceInjectables,
  primengServiceInjectables,
  httpAppServiceInjectables,
];
