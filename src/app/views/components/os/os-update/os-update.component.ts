import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Cliente } from "src/app/models/cliente";
import { Funcionario } from "src/app/models/funcionario";
import { OS } from "src/app/models/os";
import { ClienteService } from "src/app/services/cliente.service";
import { FuncionarioService } from "src/app/services/funcionario.service";
import { OsService } from "src/app/services/os.service";

@Component({
  selector: "app-os-update",
  templateUrl: "./os-update.component.html",
  styleUrls: ["./os-update.component.css"],
})
export class OsUpdateComponent implements OnInit {
  os: OS = {
    id: "",
    funcionario: "",
    cliente: "",
    observacoes: "",
    prioridade: "",
    status: "",
  };

  funcionario: Funcionario[] = [];
  cliente: Cliente[] = [];

  constructor(
    private funcionarioService: FuncionarioService,
    private clienteService: ClienteService,
    private osService: OsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.os.id = this.route.snapshot.paramMap.get("id");
    this.BuscarPorId();
    this.listarFuncioTec();
    this.listarCliente();
  }

  BuscarPorId(): void {
    this.osService.buscarPorId(this.os.id).subscribe((resposta) => {
      this.os = resposta;
      this.converteDados();
    });
  }

  atualizar() {
    this.osService.atualizar(this.os).subscribe((resposta) => {
      this.osService.message("Atualizado com sucesso!");
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

  converteDados(): void {
    if (this.os.status == "ABERTO") {
      this.os.status = 0;
    } else if (this.os.status == "ANDAMENTO") {
      this.os.status = 1;
    } else {
      this.os.status = 2;
    }

    if (this.os.prioridade == "BAIXA") {
      this.os.prioridade = 0;
    } else if (this.os.prioridade == "MEDIA") {
      this.os.prioridade = 1;
    } else {
      this.os.prioridade = 2;
    }
  }
}
