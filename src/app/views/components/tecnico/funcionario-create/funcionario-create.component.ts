import { Funcionario } from "./../../../../models/funcionario";
import { FuncionarioService } from "src/app/services/funcionario.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-funcionario-create",
  templateUrl: "./funcionario-create.component.html",
  styleUrls: ["./funcionario-create.component.css"],
})
export class FuncionarioCreateComponent implements OnInit {
  funcionario: Funcionario = {
    id: "",
    nome: "",
    cpf: "",
    telefone: "",
    login: "",
    senha: "",
    cargo: "",
  };

  nome = new FormControl("", [Validators.minLength(5)]);
  cpf = new FormControl("", [Validators.minLength(11)]);
  telefone = new FormControl("", [Validators.minLength(11)]);
  login = new FormControl("", [Validators.minLength(5)]);
  senha = new FormControl("", [Validators.minLength(5)]);

  constructor(
    private router: Router,
    private funcionarioService: FuncionarioService
  ) {}

  ngOnInit() {}

  cancelar(): void {
    this.router.navigate(["funcionario"]);
  }

  salvar(): void {
    this.funcionarioService.salvar(this.funcionario).subscribe(
      (resposta) => {
        this.router.navigate(["funcionario"]);
        this.funcionarioService.message("Funcionário cadastrado com Sucesso!");
      },
      (error) => {
        if (error.error.error.match("já cadastrado")) {
          this.funcionarioService.message(error.error.error);
        } else if (
          error.error.error[0].message ===
          " número do registro de contribuinte individual brasileiro (CPF) inválido"
        ) {
          this.funcionarioService.message("CPF inválido!");
          console.log(error);
        }
      }
    );
  }

  errorValidNome() {
    if (this.nome.invalid) {
      return "O nome deve ter no mínimo 5 caracteres!";
    }

    return false;
  }
  errorValidCpf() {
    if (this.cpf.invalid) {
      return "CPF inválido";
    }

    return false;
  }
  errorValidTelefone() {
    if (this.telefone.invalid) {
      return "Telefone deve ter no mínimo 11 caracteres!";
    }

    return false;
  }
  errorValidLogin() {
    if (this.login.invalid) {
      return "Login deve ter no mínimo 8 caracteres!";
    }

    return false;
  }
  errorValidSenha() {
    if (this.senha.invalid) {
      return "A senha deve ter no mínimo 8 caracteres!";
    }

    return false;
  }
}
