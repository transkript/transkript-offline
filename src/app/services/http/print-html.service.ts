import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PrintHtmlService {
  url = 'http://localhost:3588/api/pdf'
  constructor(private http: HttpClient) { }

  print = (model: {name: string, html: string}) => this.http.post(this.url, model, {
    responseType: "blob",
  })
}
