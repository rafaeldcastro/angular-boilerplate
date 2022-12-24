import { Injectable } from "@angular/core";
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable, catchError, switchMap, from, throwError } from "rxjs";

/**SERVICES */
import { AuthService } from "@app/auth/shared/services/auth.service";

@Injectable({
  providedIn: "root",
})
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return from(this.authService.getCurrentAuthSession()).pipe(
      switchMap((auth: any) => {
        const jwt = auth.accessToken.jwtToken;
        request = this.addToken(request, jwt);
        return next.handle(request);
      }),
      catchError((error) => throwError(() => error))
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
