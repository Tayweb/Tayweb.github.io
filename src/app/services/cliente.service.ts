import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private snack: MatSnackBar, private router : Router) {}

  listar(): Observable<Cliente[]> {
    const url = this.baseUrl + "/cliente/listar";
    return this.http.get<Cliente[]>(url);
  }

  buscarPorId(id: any): Observable<Cliente>{
    const url = this.baseUrl + "/cliente/buscar/"+id;
    return this.http.get<Cliente>(url);
  }

  salvar(cliente: Cliente): Observable<Cliente> {
    const url = this.baseUrl + "/cliente/salvar";
    return this.http.post<Cliente>(url, cliente);
  }

  atualizar(cliente: Cliente): Observable<Cliente> {
    const url = this.baseUrl + "/cliente/atualizar/" + cliente.id;
    return this.http.put<Cliente>(url, cliente);
  }

  message(msg: String): void {
    this.snack.open(`${msg}`, "OK", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 4000,
    });
  }
}
