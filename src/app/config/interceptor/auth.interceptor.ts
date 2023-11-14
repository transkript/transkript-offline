import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {sha512} from "js-sha512";
import {environment} from "../../../environments/environment";
import {AccessToken} from "../../services/http/local-storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private readonly excludedPaths = [
    "/auth/login",
    "/auth/register"
  ]

  constructor() {
  }

  private get encryptedClientSecretId() {
    const original = 'e42be8ca-8734-448a-a8cf-43a9946e471d';

    return sha512.hmac("com.skolabox.transkript.client.secret", original);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = AccessToken();
    if (environment.profile == 'prod') {
      request = this.addClientSecretId(request);
    }

    if (
      this.isExcluded(request.url)
      || accessToken == null
      || accessToken == 'undefined'
      || accessToken == ''
    ) {
      return next.handle(request);
    }

    const authorizedRequest = this.addAccessToken(request, accessToken);
    return next.handle(authorizedRequest);
  }

  private isExcluded(url: string) {
    return this.excludedPaths.some((path) => url.endsWith(path));
  }

  private addAccessToken(request: HttpRequest<unknown>, accessToken: string): HttpRequest<unknown> {
    return request.clone({
      headers: request.headers
        .set('Authorization', `Bearer ${accessToken}`)
    })
  }

  private addClientSecretId(request: HttpRequest<unknown>) {
    return request.clone({
      headers: request.headers
        .set('Client-Secret-Id', this.encryptedClientSecretId)
    })
  }
}
