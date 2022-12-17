import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdopterEsperaService } from '../Services/adopter-espera.service';
import { AdopterService } from '../Services/adopter.service';
import { MovimientoService } from '../Services/movimiento.service';
import { PetsService } from '../Services/pets.service';
import { VolunteerService } from '../Services/volunteer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userLogged: any = null;
  showUser = false;

  volunteerList = [];
  espAdoptersList = [];
  badAdoptersList = [];
  perros;
  gatos;
  total;
  movimientos = { ingresos: 0, egresos: 0, donaciones: 0 };

  constructor(
    private router: Router,
    private adopterService: AdopterService,
    private adopterEsperaService: AdopterEsperaService,
    private volunteerService: VolunteerService,
    private movimientoService: MovimientoService,
    private petService: PetsService,
  ) { }

  ngOnInit() {

    // this.volunteerList = [
    //   'example1',
    //   'example2',
    //   'example3',
    //   'example4',
    //   'example5',
    //   'example6',
    // ];

    // this.adoptersList = [
    //   'example1',
    //   'example2',
    //   'example3',
    //   'example4',
    //   'example5',
    // ];

    // this.badAdoptersList = [
    //   'example1',
    //   'example2',
    //   'example3',
    //   'example4',
    //   'example5',
    // ];

    this.adopterService.GetAdoptantesForDashboard().subscribe( adoptersResponse =>{
      this.volunteerService.GetVoluntariosForDashboard().subscribe( volunteersResponse =>{
        this.petService.GetMascotasForDashboard().subscribe( petsResponse =>{
          this.movimientoService.GetMovimientosForDashboard().subscribe( movResponse =>{
            this.adopterEsperaService.GetAdoptantesEsperaForDashboard().subscribe( adoptersEsperaResponse =>{

              console.log('adoptersEsperaResponse', adoptersEsperaResponse);
              console.log('adoptersResponse', adoptersResponse);
              console.log('volunteersResponse', volunteersResponse);
              console.log('petsResponse', petsResponse);
              console.log('movResponse', movResponse);

              this.movimientos = movResponse;
              console.log('this.movimientos', this.movimientos);
              this.volunteerList = volunteersResponse.voluntarios;
              this.espAdoptersList = adoptersEsperaResponse.listaEsperaAdoptantes;
              this.badAdoptersList = adoptersResponse.listaMalosAdoptantes;
              this.perros = petsResponse.perros;
              this.gatos = petsResponse.gatos;
              this.total = petsResponse.total;
            });
          });
        });
      });
    });

    let sessionsExistent = JSON.parse(localStorage.getItem("userLogged"));

    if(sessionsExistent != null && sessionsExistent != undefined)
    {
      console.log("usuario logueado ", sessionsExistent);
      this.showUser = true;
      this.userLogged = sessionsExistent;
    }
    else
    {
      this.router.navigate(["/main"]);
    }
  }

  closeSession()
  {
    localStorage.removeItem("userLogged");
    this.showUser = false;
    this.router.navigate(["/main"]);
  }

}
