import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {MessageService} from "primeng/api";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private msg: MessageService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => this.errorResponseHandler(error)),
      tap((event) => {
        if (event instanceof HttpResponse) {
          // this.logger.info(request.url)
        }
      })
    );
  }

  private errorResponseHandler = (response?: HttpErrorResponse | null) => {
    if (response != null && response.hasOwnProperty('error')) {
      const error = response.error

      if (ApiError.isInstanceOf(error)) {
        this.handleApiError(error as ApiError, response)
      }

      if (error instanceof ProgressEvent) {
        this.handleProgressEventError(response)
      }
    }

    return throwError(() => response);
  }

  private handleApiError(apiError: ApiError, response: HttpErrorResponse) {
    if (apiError.log) {
      const details = apiError.details.length == 0 ? '' : ' : ' + apiError.details.join(';');
      this.msg.add({
        severity: 'error',
        summary: $localize`Error`,
        detail: `${apiError.message}${details}`,
        life: 7500,
        closable: true
      });
    } else if (response.status >= 500 || response.status < 600) {
      this.msg.add({
        severity: 'error',
        summary: $localize`Error`,
        detail: $localize`Unknown error occurred. Please report this to the control desk!`,
        life: 5000,
        closable: true
      })
    }
  }

  private handleProgressEventError(progressEventError: HttpErrorResponse) {
    const error = <ApiError>{
      message: progressEventError.statusText,
      timestamp: progressEventError.error.timestamp,
      path: progressEventError.url,
      error: ''
    }
    return throwError(() => error)
  }
}

export class ApiError implements Error {
  cause: unknown = this.message;
  name: string = this.messageCode;
  stack?: string = this.trace;

  constructor(
    public message: string,
    public details: string[],
    public messageCode: string,
    public path: string,
    public timestamp: string,
    public error: {} | string,
    public log: boolean,
    public trace?: string,
  ) {
  }

  static isInstanceOf(o?: any | null): boolean {
    if (o == null) {
      return false;
    }
    if (typeof o == 'object') {
      const props = ["message", "messageCode", "path", "timestamp", "log"]
      return props.every(prop => o.hasOwnProperty(prop))
    }
    return false
  }
}
