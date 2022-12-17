import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PetsTableComponent } from './welcome-filter/pets-table/pets-table.component';
import { PetsTypeComponent } from './welcome-filter/pets-type/pets-type.component';
import { WelcomeFilterComponent } from './welcome-filter/welcome-filter.component';
import { DashboardTablesComponent } from './dashboard-tables/dashboard-tables.component';
import { FormsComponent } from './forms/forms.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Inicio Sesion' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'dashboard', animation: 'dashboard' }
  },
  {
    path: 'main',
    component: MainComponent,
    data: { title: 'Principal', animation: 'Principal' }
  },
  {
    path: 'filter',
    component: WelcomeFilterComponent,
    data: { title: 'filter', animation: 'filter' }
  },
  {
    path: 'MascotasTable',
    component: WelcomeFilterComponent,
    data: { title: 'filter', animation: 'filter' }
  },
  {
    path: 'dashboard-tables/:table',
    component: DashboardTablesComponent,
    data: { title: 'table', animation: 'filter' }
  },
  {
    path: 'dashboard-tables/movimientos/:tipo',
    component: DashboardTablesComponent,
    data: { title: 'table', animation: 'filter' }
  },
  {
    path: 'dashboard-tables/adoptantes/:caseAdopters',
    component: DashboardTablesComponent,
    data: { title: 'table', animation: 'filter' }
  },
  {
    path: 'forms/:form',
    component: FormsComponent,
    data: { title: 'form', animation: 'filter' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
