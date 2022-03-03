import { Router } from "@angular/router";
import { ClienteService } from "./../../../../services/cliente.service";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Cliente } from "src/app/models/cliente";

@Component({
  selector: "app-cliente-read",
  templateUrl: "./cliente-read.component.html",
  styleUrls: ["./cliente-read.component.css"],
})
export class ClienteReadComponent implements AfterViewInit {
  cliente: Cliente[] = [];

  displayedColumns: string[] = ["id", "nome", "cpf", "telefone", "action"];
  dataSource = new MatTableDataSource<Cliente>(this.cliente);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: ClienteService, private router: Router) {}

  ngAfterViewInit() {
    this.listar();
  }

  listar(): void {
    this.service.listar().subscribe((resposta) => {
      this.cliente = resposta;
      this.dataSource = new MatTableDataSource<Cliente>(this.cliente);
      this.dataSource.paginator = this.paginator;
    });
  }

  navigateTocreate(): void {
    this.router.navigate(["clientes/create"]);
  }
}
