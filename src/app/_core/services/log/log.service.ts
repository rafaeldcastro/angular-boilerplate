import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LogService {
  constructor(private http: HttpClient) {}

  async log(
    request: HttpRequest<any>,
    resp: HttpResponse<any> | HttpErrorResponse
  ) {
    let status: string = "SUCCESS";
    let message: string = "";
    message += `Code: ${resp.status}\n`;
    message += `Method: ${request.method}\n`;
    message += `URL: ${request.urlWithParams}\n`;

    if (resp instanceof HttpResponse) {
      //SUCCESS LOG
    } else {
      const body = resp.error.body;
      const errors = body.errors;
      const trigger: string =
        resp instanceof ErrorEvent ? "Client-side" : "Server-side";
      status = "FAILED";
      message += `Trigger: ${trigger}\n`;
      message += `Name: ${resp.name}\n`;
      message += `Message: ${resp.message}\n\n`;
      message += `API Feedback:\n`;

      if (errors instanceof Object) {
        for (const key in errors) {
          const obj = errors[key];

          if (Array.isArray(obj)) {
            message += `${key.toLocaleUpperCase()}:\n`;
            obj.forEach((o) => (message += `${o}\n`));
          } else {
            message += `${key.toLocaleUpperCase()}: ${obj}\n`;
          }
        }
      } else {
        message += `${errors}`;
      }
    }

    message = `Status: ${status}\n` + message;
    console.log(message);

    // try {
    //     await this.logToServer(message);
    // } catch (error) {
    //     console.log(error);
    // }
  }

  private logToServer(message: string): Promise<any> {
    const url: string = "";
    return lastValueFrom(this.http.post(url, message));
  }
}
