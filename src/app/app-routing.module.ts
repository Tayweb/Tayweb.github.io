import { OsViewEncerradasComponent } from "./views/components/os/os-view-encerradas/os-view-encerradas.component";
import { OsViewComponent } from "./views/components/os/os-view/os-view.component";
import { OsUpdateComponent } from "./views/components/os/os-update/os-update.component";
import { OsCreateComponent } from "./views/components/os/os-create/os-create.component";
import { OsReadComponent } from "./views/components/os/os-read/os-read.component";
import { ClienteCreateComponent } from "./views/components/cliente/cliente-create/cliente-create.component";
import { ClienteReadComponent } from "./views/components/cliente/cliente-read/cliente-read.component";
import { FuncionarioDeleteComponent } from "./views/components/tecnico/funcionario-delete/funcionario-delete.component";
import { FuncionarioUpdateComponent } from "./views/components/tecnico/funcionario-update/funcionario-update.component";
import { FuncionarioCreateComponent } from "./views/components/tecnico/funcionario-create/funcionario-create.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./views/components/home/home.component";
import { LoginComponent } from "./views/components/login/login.component";
import { TecnicoReadComponent } from "./views/components/tecnico/tecnico-read/tecnico-read.component";
import { ClienteUpdateComponent } from "./views/components/cliente/cliente-update/cliente-update.component";
import { OsClosedComponent } from "./views/components/os/os-closed/os-closed.component";
import { RelatorioOsComponent } from "./views/components/relatorios/relatorio-os/relatorio-os.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },

  {
    path: "login",
    component: LoginComponent,
  },

  {
    path: "home",
    component: HomeComponent,
  },

  {
    path: "funcionario",
    component: TecnicoReadComponent,
  },

  {
    path: "funcionario/create",
    component: FuncionarioCreateComponent,
  },

  {
    path: "funcionario/update/:id",
    component: FuncionarioUpdateComponent,
  },

  {
    path: "funcionario/delete/:id",
    component: FuncionarioDeleteComponent,
  },

  {
    path: "clientes",
    component: ClienteReadComponent,
  },

  {
    path: "clientes/create",
    component: ClienteCreateComponent,
  },

  {
    path: "clientes/update/:id",
    component: ClienteUpdateComponent,
  },

  {
    path: "os",
    component: OsReadComponent,
  },
  {
    path: "os/closed",
    component: OsClosedComponent,
  },

  {
    path: "os/create",
    component: OsCreateComponent,
  },

  {
    path: "os/update/:id",
    component: OsUpdateComponent,
  },

  {
    path: "os/view/:id",
    component: OsViewComponent,
  },

  {
    path: "os/viewencerradas/:id",
    component: OsViewEncerradasComponent,
  },

  {
    path: "relatorio",
    component: RelatorioOsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
