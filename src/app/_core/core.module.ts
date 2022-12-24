import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";

/**MODULES */
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

/**INTERCEPTORS */
import {
  HttpTokenInterceptor,
  ErrorInterceptor,
  HttpCacheInterceptor,
} from "@core/interceptors/_index";

@NgModule({
  declarations: [],
  imports: [CommonModule, BrowserModule, HttpClientModule],
  exports: [BrowserModule, HttpClientModule],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpCacheInterceptor,
      multi: true,
    },
    {
      //Put ALWAYS in the last position. Interceptors fires in declaration order
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
