import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

/**MODELS */
import { Observable, BehaviorSubject, of } from "rxjs";
import { environment as env } from "@env";
import { Credentials } from "../models/credentials.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  tempCredentials!: Credentials;
  private isAuth: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private router: Router) {}

  isAuthenticated(): Observable<boolean> {
    return of(true);
  }

  hasPermissions() {
    return of(true);
  }

  signIn(username: string, password: string) {}

  signUp(credentials: Credentials) {}

  forgotPassword(username: string) {}

  initAuthProviderConfig(options?: any) {}

  getCurrentAuthSession() {
    return of({});
  }

  signOut(fromAllDevices?: boolean) {
    this.router.navigateByUrl(`/`, { replaceUrl: true });
  }
}
