import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { OS } from "../models/os";

@Injectable({
  providedIn: "root",
})
export class OsService {
  baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  listar(): Observable<OS[]> {
    const url = this.baseUrl + "/os/listar";
    return this.http.get<OS[]>(url);
  }

  buscarPorId(id: any): Observable<OS> {
    const url = this.baseUrl + "/os/buscar/" + id;
    return this.http.get<OS>(url);
  }

  salvar(os: OS): Observable<OS> {
    const url = this.baseUrl + "/os/salvar";
    return this.http.post<OS>(url, os);
  }

  atualizar(os: OS): Observable<OS> {
    const url = this.baseUrl + "/os/atualizar/" + os.id;
    return this.http.put<OS>(url, os);
  }

  message(msg: String): void {
    this.snack.open(`${msg}`, "OK", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 4000,
    });
  }
}
