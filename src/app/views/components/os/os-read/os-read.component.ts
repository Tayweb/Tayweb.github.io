import { ClienteService } from "./../../../../services/cliente.service";
import { FuncionarioService } from "src/app/services/funcionario.service";
import { AfterViewInit, ViewChild } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { OS } from "src/app/models/os";
import { OsService } from "src/app/services/os.service";

@Component({
  selector: "app-os-read",
  templateUrl: "./os-read.component.html",
  styleUrls: ["./os-read.component.css"],
})
export class OsReadComponent implements AfterViewInit {
  os: OS[] = [];

  displayedColumns: string[] = [
    "abertura",
    "prioridade",
    "status",
    "funcionario",
    "cliente",
    "action"
  ];
  dataSource = new MatTableDataSource<OS>(this.os);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: OsService,
    private router: Router,
    private funcionarioService: FuncionarioService,
    private clienteService: ClienteService
  ) {}

  ngAfterViewInit() {
    this.listar();
  }

  listar(): void {
    this.service.listar().subscribe((resposta) => {
      resposta.forEach(x => {
        if(x.status != "ENCERRADO"){
          this.os.push(x)

        }
      })

      
      this.listaFuncioTec();
      this.listaCliente();
      this.dataSource = new MatTableDataSource<OS>(this.os);
      this.dataSource.paginator = this.paginator;
    });
  }

  navigateTocreate(): void {
    this.router.navigate(["os/create"]);
  }

  listaFuncioTec(): void {
    this.os.forEach((x) => {
      this.funcionarioService
        .buscarPorId(x.funcionario)
        .subscribe((resposta) => {
          x.funcionario = resposta.nome;
        });
    });
  }

  listaCliente(): void {
    this.os.forEach((x) => {
      this.clienteService.buscarPorId(x.cliente).subscribe((resposta) => {
        x.cliente = resposta.nome;
      });
    });
  }

  prioridade(x: any){
    if( x == 'BAIXA'){
      return 'baixa'
    }else if(x == 'MEDIA'){
      return 'media'
    } else{
      return 'alta'
    }
  }

  status(x: any){
    if( x == 'ABERTO'){
      return 'baixa'
    }else if(x == 'ANDAMENTO'){
      return 'media'
    } else{
      return 'alta'
    }
  }
}
