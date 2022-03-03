import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Funcionario } from './../models/funcionario';

@Injectable({
  providedIn: "root",
})
export class FuncionarioService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  listar(): Observable<Funcionario[]> {
    const url = this.baseUrl + "/funcionario/listar";
    return this.http.get<Funcionario[]>(url);
  }

  listaTecnico(): Observable<Funcionario[]> {
    const url = this.baseUrl + "/funcionario/listatecnico";
    return this.http.get<Funcionario[]>(url);
  }

  buscarPorId(id: any): Observable<Funcionario>{
    const url = this.baseUrl + "/funcionario/buscar/"+id;
    return this.http.get<Funcionario>(url);
  }

  salvar(funcionario: Funcionario): Observable<Funcionario> {
    const url = this.baseUrl + "/funcionario/salvar";
    return this.http.post<Funcionario>(url, funcionario);
  }

  atualizar(funcionario: Funcionario): Observable<Funcionario> {
    const url = this.baseUrl + "/funcionario/atualizar/" + funcionario.id;
    return this.http.put<Funcionario>(url, funcionario);
  }

  desativar(id: any): Observable<Funcionario> {
    const url = this.baseUrl + "/funcionario/desativar/" +id;
    return this.http.put<Funcionario>(url, id);

  }

  message(msg: String): void {
    this.snack.open(`${msg}`, "OK", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 4000,
    });
  }
}
