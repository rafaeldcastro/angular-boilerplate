import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from "@angular/common/http";
import { HttpCacheService } from "./http-cache.service";
import { Observable, of, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpCacheInterceptor implements HttpInterceptor {
  constructor(private _cache: HttpCacheService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.method !== "GET") {
      this._cache.deleteMatching(request);
      return next.handle(request);
    }

    const cachedResponse: HttpResponse<any> | null = this._cache.get(request);

    if (cachedResponse) {
      return of(cachedResponse.clone());
    } else {
      return next.handle(request).pipe(
        tap<HttpEvent<any>>((httpEvent: HttpEvent<any>) => {
          if (httpEvent instanceof HttpResponse) {
            this._cache.set(request, httpEvent);
          }
        })
      );
    }
  }
}
