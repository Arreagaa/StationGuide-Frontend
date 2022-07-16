import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { DashboardInicioComponent } from './components/dashboard-inicio/dashboard-inicio.component';

import { PerfilClienteComponent } from './components/perfil-cliente/perfil-cliente.component';
import { AdministracionUsuariosComponent } from './components/administracion-usuarios/administracion-usuarios.component';

import { UsuarioGuard } from './services/usuario.guard';
import { AdministradorGuard } from './services/administrador.guard';

const routes: Routes = [
  {path: 'Login', component: LoginComponent},
  {path: 'Registro', component: RegistroComponent},
  {path: 'DashboardInicio', component: DashboardInicioComponent},
  {path: 'Inicio', component: InicioComponent},

  {
    path: 'Usuario', canActivate: [UsuarioGuard], children:[
      {path: 'Inicio', component: InicioComponent},

      {path: 'PerfilCliente', component: PerfilClienteComponent}
    ]
  },
  {
    path: 'Admin', canActivate: [AdministradorGuard], children:[
      {path: 'Inicio', component: InicioComponent},

      {path: 'AdministracionUsuarios', component: AdministracionUsuariosComponent},
    ]
  },
  { path: "**", component: LoginComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
