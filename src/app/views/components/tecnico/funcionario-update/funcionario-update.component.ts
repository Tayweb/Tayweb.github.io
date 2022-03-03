import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Funcionario } from "src/app/models/funcionario";
import { FuncionarioService } from "src/app/services/funcionario.service";

@Component({
  selector: "app-funcionario-update",
  templateUrl: "./funcionario-update.component.html",
  styleUrls: ["./funcionario-update.component.css"],
})
export class FuncionarioUpdateComponent implements OnInit {
  id_funcio = "";

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
  login = new FormControl("", [Validators.minLength(3)]);
  senha = new FormControl("", [Validators.minLength(8)]);

  constructor(
    private router: Router,
    private funcionarioService: FuncionarioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id_funcio = this.route.snapshot.paramMap.get("id")!;
    this.buscarPorId();
    this.converteDadfuncionario();
  }

  buscarPorId(): void {
    this.funcionarioService
      .buscarPorId(this.id_funcio)
      .subscribe((respfuncionariota) => {
        this.funcionario = respfuncionariota;
      });
  }

  atualizar(): void {
    this.funcionarioService.atualizar(this.funcionario).subscribe(
      (respfuncionariota) => {
        this.router.navigate(["funcionario"]);
        this.funcionarioService.message("Atualizado com sucesso!");
      },
      (error) => {
        if (error.error.error.match("CPF já cadastrado")) {
          this.funcionarioService.message(error.error.error);
        } else if (
          error.error.errors[0].message ===
          "número do registro de contribuinte individual brasileiro (CPF) inválido"
        ) {
          this.funcionarioService.message("CPF inválido!");
        }
      }
    );
  }

  cancelar(): void {
    this.router.navigate(["funcionario"]);
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
      return "Telefone inválido!";
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

  converteDadfuncionario(): void {
    if (this.funcionario.cargo == "ASSISTENTE") {
      this.funcionario.cargo = 0;
    } else if (this.funcionario.cargo == "TECNICO") {
      this.funcionario.cargo = 1;
    } else {
      this.funcionario.cargo = 2;
    }
  }
}
