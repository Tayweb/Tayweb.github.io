import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { OS } from 'src/app/models/os';
import { OSReport } from 'src/app/models/osReport';
import { OsService } from 'src/app/services/os.service';
import { RelatoriosService } from 'src/app/services/relatorios.service';
import { GeracaoRelatorioComponent } from '../../relatorios/geracao-relatorio/geracao-relatorio.component';

@Component({
  selector: 'app-os-view-encerradas',
  templateUrl: './os-view-encerradas.component.html',
  styleUrls: ['./os-view-encerradas.component.css']
})
export class OsViewEncerradasComponent implements OnInit {

  os: OS = {
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
    private router: Router,
    public dialog: MatDialog,
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
    this.router.navigate(["os/closed"]);
  }
}
