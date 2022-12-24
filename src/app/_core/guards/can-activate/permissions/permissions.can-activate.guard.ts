import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";

/**MODELS */
import { Observable } from "rxjs";

/**SERVICES */
import { AuthService } from "@app/auth/shared/services/auth.service";

@Injectable({
  providedIn: "root",
})
export class PermissionsCanActivateGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.hasPermissions();
  }
}
