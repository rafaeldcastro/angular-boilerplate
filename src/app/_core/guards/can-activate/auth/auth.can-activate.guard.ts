import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";

/**MODELS */
import { appRoutes } from "@app/app-routes-names";
import { Observable, map } from "rxjs";

/**SERVICES */
import { AuthService } from "@app/auth/shared/services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthCanActivateGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService
      .isAuthenticated()
      .pipe(
        map(
          (isAuth) =>
            isAuth ||
            this.router.createUrlTree([`/${appRoutes.NOT_AUTH_REDIRECT.route}`])
        )
      );
  }
}
