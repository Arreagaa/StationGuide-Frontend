import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { DashboardInicioComponent } from './components/dashboard-inicio/dashboard-inicio.component';

import { PerfilClienteComponent } from './components/perfil-cliente/perfil-cliente.component';
import { AdministracionUsuariosComponent } from './components/administracion-usuarios/administracion-usuarios.component';

import { ChartsModule } from '@rinminase/ng-charts';

import { BuscarPipe } from './pipes/buscar.pipe';
import { BuscarClientePipe } from './pipes/buscarCliente.pipe';
import { BuscarNewPipe } from './pipes/buscarNew.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardGasolinerasComponent } from './components/dashboard-gasolineras/dashboard-gasolineras.component';
import { GasolinerasComponent } from './components/gasolineras/gasolineras.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { EstacionesComponent } from './components/estaciones/estaciones.component';
import { NoticiaDetalleComponent } from './components/noticia-detalle/noticia-detalle.component';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    NavbarComponent,
    DashboardInicioComponent,
    BuscarPipe,
    BuscarClientePipe,
    BuscarNewPipe,

    PerfilClienteComponent,
    FooterComponent,
    AdministracionUsuariosComponent,
    DashboardGasolinerasComponent,
    GasolinerasComponent,
    NoticiasComponent,
    EstacionesComponent,
    NoticiaDetalleComponent,
    UbicacionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
