import { Injectable } from "@angular/core";

/*MODELS*/
import { environment as env } from "@env";

@Injectable({
  providedIn: "root",
})
export class DarkModeService {
  private darkModeCssClass: string = "dark";
  private darkModeStorageKey: string = `${env.APP_PREFIX}-IS-DARKMODE`;

  checkUserPref() {
    try {
      const isDarkMode: boolean = JSON.parse(
        localStorage.getItem(this.darkModeStorageKey) || ""
      );
      if (isDarkMode) {
        const body = this.getBodyElement();
        body.classList.add("dark");
      }
    } catch (error) {}
  }

  isDarkMode(): boolean {
    const body = this.getBodyElement();
    return body.classList.contains(this.darkModeCssClass);
  }

  toggleDarkMode() {
    const body = this.getBodyElement();
    body.classList.toggle(this.darkModeCssClass);

    const isDarkMode = this.isDarkMode();
    localStorage.setItem(
      `${this.darkModeStorageKey}`,
      JSON.stringify(isDarkMode)
    );
  }

  private getBodyElement(): any {
    return document.querySelector("body");
  }
}
