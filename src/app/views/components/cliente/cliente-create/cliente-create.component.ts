import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Cliente } from "src/app/models/cliente";
import { ClienteService } from "src/app/services/cliente.service";

@Component({
  selector: "app-cliente-create",
  templateUrl: "./cliente-create.component.html",
  styleUrls: ["./cliente-create.component.css"],
})
export class ClienteCreateComponent implements OnInit {
  cliente: Cliente = {
    id: "",
    nome: "",
    cpf: "",
    telefone: "",
  };

  nome = new FormControl("", [Validators.minLength(5)]);
  cpf = new FormControl("", [Validators.minLength(11)]);
  telefone = new FormControl("", [Validators.minLength(11)]);

  constructor(private router: Router, private clienteService: ClienteService) {}

  ngOnInit() {}

  cancelar(): void {
    this.router.navigate(["clientes"]);
  }

  salvar(): void {
    this.clienteService.salvar(this.cliente).subscribe(
      (resposta) => {
        this.router.navigate(["clientes"]);
        this.clienteService.message("Funcionário cadastrado com Sucesso!");
      },
      (error) => {
        if (error.error.error.match("já cadastrado")) {
          this.clienteService.message(error.error.error);
        } else if (
          error.error.error[0].message ===
          " número do registro de contribuinte individual brasileiro (CPF) inválido"
        ) {
          this.clienteService.message("CPF inválido!");
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
}
