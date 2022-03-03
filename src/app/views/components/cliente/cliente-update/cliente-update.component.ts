import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {
  
  id_cliente = "";
  
  cliente: Cliente = {
    id: "",
    nome: "",
    cpf: "",
    telefone: "",
  };

  nome = new FormControl("", [Validators.minLength(5)]);
  cpf = new FormControl("", [Validators.minLength(11)]);
  telefone = new FormControl("", [Validators.minLength(11)]);

  constructor(private router: Router, private clienteService: ClienteService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id_cliente = this.route.snapshot.paramMap.get("id")!;
    this.buscarPorId();
  }

  cancelar(): void {
    this.router.navigate(["clientes"]);
  }

  buscarPorId(): void {
    this.clienteService
      .buscarPorId(this.id_cliente)
      .subscribe((resposta) => {
        this.cliente = resposta;
      });
  }

  atualizar(): void {
    this.clienteService.atualizar(this.cliente).subscribe(
      (resposta) => {
        this.router.navigate(["clientes"]);
        this.clienteService.message("Atualizado com sucesso!");
      },
      error => {
        if (error.error.error.match("CPF já cadastrado")) {
          this.clienteService.message(error.error.error)
        }else if (
          error.error.errors[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido"
        ) {
          this.clienteService.message("CPF inválido!")
        }
      }
    )
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

}
