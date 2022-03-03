import { Router } from "@angular/router";
import { OsService } from "./../../../../services/os.service";
import { OS } from "src/app/models/os";
import { Cliente } from "./../../../../models/cliente";
import { ClienteService } from "./../../../../services/cliente.service";
import { Funcionario } from "src/app/models/funcionario";
import { FuncionarioService } from "src/app/services/funcionario.service";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-os-create",
  templateUrl: "./os-create.component.html",
  styleUrls: ["./os-create.component.css"],
})
export class OsCreateComponent implements OnInit {
  os: OS = {
    funcionario: "",
    cliente: "",
    observacoes: "",
    prioridade: "",
    status: "",
  };

  funcionario: Funcionario[] = [];
  cliente: Cliente[] = [];

  observacoes = new FormControl("", [Validators.minLength(10)]);

  constructor(
    private funcionarioService: FuncionarioService,
    private clienteService: ClienteService,
    private osService: OsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listarFuncioTec();
    this.listarCliente();
  }

  salvar() {
    this.osService.salvar(this.os).subscribe((resposta) => {
      this.osService.message("Ordem de Serviço criada com sucesso");
      this.router.navigate(["os"]);
    });
  }

  cancelar(): void {
    this.router.navigate(["os"]);
  }

  listarFuncioTec(): void {
    this.funcionarioService.listaTecnico().subscribe((resposta) => {
      this.funcionario = resposta;
    });
  }

  listarCliente(): void {
    this.clienteService.listar().subscribe((resposta) => {
      this.cliente = resposta;
    });
  }

  errorValidObs() {
    if (this.observacoes.invalid) {
      return "A descrição deve ter no mínimo 10 caracteres!";
    }

    return false;
  }
}
