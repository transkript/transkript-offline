import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PrintHtmlService {
  url = 'http://localhost:3588/api/pdf'

  constructor(private http: HttpClient) {
  }

  print = (model: { name: string, html: string }, download = true) => this.http.post(this.url, model, {
    responseType: "blob",
  }).pipe(tap((res) => {
    if (download) downloadBlob(res);
  }));
}


export const getBlobDownloadLink = (o: Blob) => {
  const blob = new Blob([o], {type: o.type});
  return URL.createObjectURL(blob);
}
export const downloadBlob = (o: Blob) => {
  const downloadLink = getBlobDownloadLink(o);
  const anchorElement = document.createElement('a');
  anchorElement.href = downloadLink;
  anchorElement.target = "_blank";
  anchorElement.rel = "noopener noreferrer";

  document.body.appendChild(anchorElement);
  anchorElement.click();
  document.body.removeChild(anchorElement);
}
