import { Injectable } from "@angular/core";
import { CanLoad, Router, Route, UrlSegment, UrlTree } from "@angular/router";

/**MODELS */
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

/**SERVICES */
import { AuthService } from "@app/auth/shared/services/auth.service";

@Injectable({
  providedIn: "root",
})
export class PermissionsCanLoadGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(): Observable<boolean | UrlTree> {
    return this.authService
      .isAuthenticated()
      .pipe(map((isAuth) => isAuth || this.router.createUrlTree([""])));
  }
}
