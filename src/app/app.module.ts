import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { WelcomeCarouselComponent } from './main/welcome-carousel/welcome-carousel.component';
import { WelcomeFilterComponent } from './welcome-filter/welcome-filter.component';
import { PetsTypeComponent } from './welcome-filter/pets-type/pets-type.component';
import { PetsTableComponent } from './welcome-filter/pets-table/pets-table.component';

import { DashboardTablesComponent } from './dashboard-tables/dashboard-tables.component';
import { MovimientosTableComponent } from './dashboard-tables/movimientos-table/movimientos-table.component';
import { VoluntariosTableComponent } from './dashboard-tables/voluntarios-table/voluntarios-table.component';
import { AdoptantesTableComponent } from './dashboard-tables/adoptantes-table/adoptantes-table.component';
import { FormsComponent } from './forms/forms.component';
import { FormVoluntarioComponent } from './forms/form-voluntario/form-voluntario.component';
import { FormAdoptanteComponent } from './forms/form-adoptante/form-adoptante.component';
import { FormMovimientoComponent } from './forms/form-movimiento/form-movimiento.component';
import { FormMascotaComponent } from './forms/form-mascota/form-mascota.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainComponent,
    NavbarComponent,
    WelcomeCarouselComponent,
    WelcomeFilterComponent,
    LoginComponent,
    PetsTypeComponent,
    PetsTableComponent,
    DashboardTablesComponent,
    MovimientosTableComponent,
    VoluntariosTableComponent,
    AdoptantesTableComponent,
    FormsComponent,
    FormVoluntarioComponent,
    FormAdoptanteComponent,
    FormMovimientoComponent,
    FormMascotaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  entryComponents:[
    LoginComponent

  ],
  exports: [
    PetsTypeComponent,
    PetsTableComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
