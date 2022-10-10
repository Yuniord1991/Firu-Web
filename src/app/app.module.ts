import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { WelcomeCarouselComponent } from './main/welcome-carousel/welcome-carousel.component';
import { WelcomeFilterComponent } from './welcome-filter/welcome-filter.component';
import { PetsTypeComponent } from './welcome-filter/pets-type/pets-type.component';
import { PetsTableComponent } from './welcome-filter/pets-table/pets-table.component';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    NavbarComponent,
    WelcomeCarouselComponent,
    WelcomeFilterComponent,
    PetsTypeComponent,
    PetsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    PetsTypeComponent,
    PetsTableComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
