import { Injectable } from "@angular/core";
import { HttpRequest, HttpResponse } from "@angular/common/http";

/**MODELS */
import { CACHEABLE_ROUTES } from "./http-cache-routes.constant";

@Injectable({
  providedIn: "root",
})
export class HttpCacheService {
  private _cache: { [key: string]: HttpResponse<any> } = {};

  get(req: HttpRequest<any>): HttpResponse<any> | null {
    const cachedItem: HttpResponse<any> = this._cache[
      req.urlWithParams
    ] as HttpResponse<any>;

    if (cachedItem) {
      return cachedItem;
    }
    return null;
  }

  set(req: HttpRequest<any>, res: HttpResponse<any>): void {
    this.cacheToLocal(req.urlWithParams, res);
  }

  delete(req: HttpRequest<any>): boolean {
    const cachedRequest = this.get(req);

    let returnVal = false;

    if (cachedRequest) {
      delete this._cache[req.urlWithParams];
      returnVal = true;
    }

    return returnVal;
  }

  deleteMatching(req: HttpRequest<any>) {
    try {
      const matchedCacheableRoutes: string[] = CACHEABLE_ROUTES.filter((r) =>
        req.urlWithParams.match(".*\\b" + r + "\\b.*")
      );

      if (matchedCacheableRoutes.length === 0) {
        return;
      }

      const toRemove: string[] = [];
      matchedCacheableRoutes.forEach((c) => {
        for (const key in this._cache) {
          if (key.match(".*\\b" + c + "\\b.*")) {
            toRemove.push(key);
          }
        }
      });
      toRemove.forEach((key) => delete this._cache[key]);
    } catch (error) {
      console.log(error);
    }
  }

  keys(): string[] {
    return Object.keys(this._cache);
  }

  private cacheToLocal(urlWithParams: string, res: HttpResponse<any>) {
    this._cache[urlWithParams] = res;
  }
}
