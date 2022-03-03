import { FuncionarioDeleteComponent } from './../funcionario-delete/funcionario-delete.component';
import { Router } from '@angular/router';
import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { FuncionarioService } from "src/app/services/funcionario.service";
import { Funcionario } from "../../../../models/funcionario";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: "app-tecnico-read",
  templateUrl: "./tecnico-read.component.html",
  styleUrls: ["./tecnico-read.component.css"],
})
export class TecnicoReadComponent implements AfterViewInit {
  funcionario: Funcionario[] = [];

  displayedColumns: string[] = ["id", "nome", "cpf", "telefone","action"];
  dataSource = new MatTableDataSource<Funcionario>(this.funcionario);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: FuncionarioService, private router : Router) {}

  ngAfterViewInit() {
    this.listar();
  }

  listar(): void {
    this.service.listar().subscribe((resposta) => {
      this.funcionario = resposta;
      this.dataSource = new MatTableDataSource<Funcionario>(this.funcionario);
      this.dataSource.paginator = this.paginator;
    });
  }

  navigateTocreate():void{
    this.router.navigate(['funcionario/create'])
  }
}
