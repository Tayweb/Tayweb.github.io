import { OSReport } from './../../../../models/osReport';
import { ClienteService } from "src/app/services/cliente.service";
import { FuncionarioService } from "src/app/services/funcionario.service";
import { OsService } from "src/app/services/os.service";
import { OS } from "src/app/models/os";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { GeracaoRelatorioComponent } from "../../relatorios/geracao-relatorio/geracao-relatorio.component";
import { RelatoriosService } from "src/app/services/relatorios.service";

@Component({
  selector: "app-os-view",
  templateUrl: "./os-view.component.html",
  styleUrls: ["./os-view.component.css"],
})
export class OsViewComponent implements OnInit {
  os: OS = {
    id: "",
    observacoes: "",
    prioridade: "",
    status: "",
    funcionario: "",
    cliente: "",
  };


  osReport = new OSReport;

  constructor(
    private route: ActivatedRoute,
    private osService: OsService,
    public dialog: MatDialog,
    private router: Router,
    private relatorioService: RelatoriosService,
  ) {}

  ngOnInit(): void {
    this.os.id = this.route.snapshot.paramMap.get("id");
    this.buscarPorId();
    this.osReport.id = this.os.id
  }

  buscarPorId(): void {
    this.osService.buscarPorId(this.os.id).subscribe((resposta) => {
      this.os = resposta;
    });
  }

  openDialog() {
    this.dialog.open(GeracaoRelatorioComponent);
    return this.relatorioService.downloadPdfParamId(this.osReport);
  }

  cancelar(): void {
    this.router.navigate(["os"]);
  }
}
