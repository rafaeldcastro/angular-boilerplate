import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { Observable, of } from "rxjs";

/**MODELS */
import { ICanDeactivate } from "./ican-deactivate.interface";

/**
 * Must be applied as a guard during component declaration,
 * whether it is in a route module or not
 */

@Injectable({
  providedIn: "root",
})
export class CanDeactivateGuard implements CanDeactivate<ICanDeactivate> {
  canDeactivate(
    component: ICanDeactivate
  ): Observable<boolean> | Promise<boolean> | boolean {
    try {
      //Knonw bug where hit browser backbutton 2x doesn't trigger the guard
      if (!component.canDeactivate()) {
        if (confirm("Are you sure you want to leave the page?")) {
          return of(true);
        } else {
          return of(false);
        }
      }
      return of(true);
    } catch (error) {
      console.error(
        "Error: Component does not implement interface ICanDeactivate"
      );
      console.error(error);
    }
    return of(true);
  }
}
