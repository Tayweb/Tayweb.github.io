import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderInterceptorModule } from "./services/Header-Interceptor.service";
import { ClienteCreateComponent } from "./views/components/cliente/cliente-create/cliente-create.component";
import { ClienteReadComponent } from "./views/components/cliente/cliente-read/cliente-read.component";
import { ClienteUpdateComponent } from "./views/components/cliente/cliente-update/cliente-update.component";
import { HomeComponent } from "./views/components/home/home.component";
import { LoginComponent } from "./views/components/login/login.component";
import { OsClosedComponent } from "./views/components/os/os-closed/os-closed.component";
import { OsCreateComponent } from "./views/components/os/os-create/os-create.component";
import { OsReadComponent } from "./views/components/os/os-read/os-read.component";
import { OsUpdateComponent } from "./views/components/os/os-update/os-update.component";
import { OsViewEncerradasComponent } from "./views/components/os/os-view-encerradas/os-view-encerradas.component";
import { OsViewComponent } from "./views/components/os/os-view/os-view.component";
import { RelatorioOsComponent } from "./views/components/relatorios/relatorio-os/relatorio-os.component";
import { FuncionarioCreateComponent } from "./views/components/tecnico/funcionario-create/funcionario-create.component";
import { FuncionarioDeleteComponent } from "./views/components/tecnico/funcionario-delete/funcionario-delete.component";
import { FuncionarioUpdateComponent } from "./views/components/tecnico/funcionario-update/funcionario-update.component";
import { TecnicoReadComponent } from "./views/components/tecnico/tecnico-read/tecnico-read.component";
import { FooterComponent } from "./views/components/template/footer/footer.component";
import { HeaderComponent } from "./views/components/template/header/header.component";
import { NavComponent } from "./views/components/template/nav/nav.component";
import { GeracaoRelatorioComponent } from './views/components/relatorios/geracao-relatorio/geracao-relatorio.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    TecnicoReadComponent,
    LoginComponent,
    FuncionarioCreateComponent,
    FuncionarioUpdateComponent,
    FuncionarioDeleteComponent,
    ClienteReadComponent,
    ClienteCreateComponent,
    ClienteUpdateComponent,
    OsReadComponent,
    OsCreateComponent,
    OsUpdateComponent,
    OsViewComponent,
    OsClosedComponent,
    OsViewEncerradasComponent,
    RelatorioOsComponent,
    GeracaoRelatorioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatMenuModule,
    HeaderInterceptorModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
