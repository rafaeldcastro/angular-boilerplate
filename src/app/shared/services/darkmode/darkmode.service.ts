import { Injectable } from "@angular/core";

/*MODELS*/
import { environment as env } from "@env";

@Injectable({
  providedIn: "root",
})
export class DarkModeService {
  private darkModeKey: string = `${env.APP_PREFIX}-IS-DARKMODE`;

  constructor() {}

  isDarkModeEnabled(): boolean {
    const darkModeSetting = localStorage.getItem(this.darkModeKey);
    if (darkModeSetting !== null) {
      return darkModeSetting === "true";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  enableDarkMode(): void {
    localStorage.setItem(this.darkModeKey, "true");
  }

  disableDarkMode(): void {
    localStorage.setItem(this.darkModeKey, "false");
  }

  toggleDarkMode(): void {
    document.body.classList.toggle("dark", this.isDarkModeEnabled());
  }
}
