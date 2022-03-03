import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}
  baseUrl: string = environment.baseUrl;

  login(funcionario: any) {
    const url = this.baseUrl + "/login";
    return this.http.post(url, JSON.stringify(funcionario)).subscribe(data => {
      var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];

      localStorage.setItem("token", token);
      this.router.navigate(['home']);
    },
    error =>{
      alert("Acesso negado")
    }
    
    );
  }
}
