import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable, catchError, throwError, tap, finalize } from "rxjs";

/**SERVICES */
import { LogService } from "@app/_core/services/log/log.service";

@Injectable({
  providedIn: "root",
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private logService: LogService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let response: HttpResponse<any> | HttpErrorResponse;

    return next.handle(request).pipe(
      tap((resp) => {
        if (resp instanceof HttpResponse) {
          response = resp;
        }
      }),
      catchError((resp: HttpErrorResponse) => {
        response = resp;
        // DialogMessage.error(resp);

        return throwError(() => resp.error);
      }),
      finalize(() => {
        this.logService.log(request, response);
      })
    );
  }
}
