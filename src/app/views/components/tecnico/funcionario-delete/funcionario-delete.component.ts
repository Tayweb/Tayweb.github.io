import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from 'src/app/models/funcionario';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-funcionario-delete',
  templateUrl: './funcionario-delete.component.html',
  styleUrls: ['./funcionario-delete.component.css']
})
export class FuncionarioDeleteComponent implements OnInit {
  id_funcio = "";

  funcionario: Funcionario = {
    id: "",
    nome: "",
    cpf: "",
    telefone: "",
    login: "",
    senha: "",
  };
  constructor(
    private router: Router,
    private funcionarioService: FuncionarioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id_funcio = this.route.snapshot.paramMap.get("id")!;
    this.buscarPorId();
  }

  buscarPorId(): void {
    this.funcionarioService
      .buscarPorId(this.id_funcio)
      .subscribe((resposta) => {
        this.funcionario = resposta;
      });
  }

  desativar(){
    this.funcionarioService.desativar(this.id_funcio).subscribe(resposta => {
      this.router.navigate(["funcionario"]);
      this.funcionarioService.desativar('Desativado com sucesso!')
    }, error => {
      console.log(error)
    })
  }

  cancelar(): void {
    this.router.navigate(["funcionario"]);
  }

}
