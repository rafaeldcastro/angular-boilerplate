import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
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
export class PermissionsCanActivateChildGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivateChild(): Observable<boolean | UrlTree> {
    return this.authService.hasPermissions();
  }
}
