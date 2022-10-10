import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { PetsTableComponent } from './welcome-filter/pets-table/pets-table.component';
import { PetsTypeComponent } from './welcome-filter/pets-type/pets-type.component';
import { WelcomeFilterComponent } from './welcome-filter/welcome-filter.component';


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
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Registro', animation: 'Registro' }
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
