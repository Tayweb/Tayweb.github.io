import { OSReport } from "./../../../../models/osReport";
import { RelatoriosService } from "./../../../../services/relatorios.service";
import { MatDialog } from "@angular/material/dialog";
import { GeracaoRelatorioComponent } from "./../geracao-relatorio/geracao-relatorio.component";
import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-relatorio-os",
  templateUrl: "./relatorio-os.component.html",
  styleUrls: ["./relatorio-os.component.css"],
})
export class RelatorioOsComponent implements OnInit {
  osReport = new OSReport;

  constructor(
    public dialog: MatDialog,
    private relatorioService: RelatoriosService
  ) {}

  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(GeracaoRelatorioComponent);
    return this.relatorioService.downloadPdfParam(this.osReport);
  }
}
