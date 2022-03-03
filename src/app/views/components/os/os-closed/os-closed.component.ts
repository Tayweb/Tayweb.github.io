import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OS } from 'src/app/models/os';
import { ClienteService } from 'src/app/services/cliente.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { OsService } from 'src/app/services/os.service';

@Component({
  selector: 'app-os-closed',
  templateUrl: './os-closed.component.html',
  styleUrls: ['./os-closed.component.css']
})
export class OsClosedComponent implements AfterViewInit {
  os: OS[] = [];

  displayedColumns: string[] = [
    "abertura",
    "fechamento",
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
        if(x.status == "ENCERRADO"){
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
    if( x == 'ENCERRADO'){
      return 'encerrado'
    }else 
      return null
  }

}
