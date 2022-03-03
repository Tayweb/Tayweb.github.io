import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { OS } from "../models/os";
import { OSReport } from "../models/osReport";

@Injectable({
  providedIn: "root",
})
export class RelatoriosService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}


downloadPdf(){
  const url = this.baseUrl + "/relatorios/relatorio";
  return this.http
  .get(url, { responseType: "text" })
  .subscribe((data) => {
    document.querySelector("iframe")!.src = data;
  });
}


  downloadPdfParam(osReport: OSReport) {
    const url = this.baseUrl + "/relatorios/relatorioporparam";
    return this.http
      .post(url, osReport, { responseType: "text" })
      .subscribe((data) => {
        document.querySelector("iframe")!.src = data;
      });
  }

  downloadPdfParamId(osReport: OSReport) {
    const url = this.baseUrl + "/relatorios/relatorioporid";
    return this.http .post(url, osReport, { responseType: "text" })
    .subscribe((data) => {
      document.querySelector("iframe")!.src = data;
    });
  }
}
