import { Component, OnInit } from '@angular/core';
import {transition, trigger, state, query, style, animate, group, stagger, animateChild, keyframes} from '@angular/animations';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-tables',
  templateUrl: './dashboard-tables.component.html',
  styleUrls: ['./dashboard-tables.component.css'],
  animations: [
    // trigger('rounding',[
    //   state('start', style({
    //     opacity:1
    //   })),
    //   state('nope', style({}))
    // ])
  ]
})
export class DashboardTablesComponent implements OnInit {

  tableToShow;
  sendAdopterType;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {

    // if (this.router.url.toString().includes("/movimientos")) {
    //   console.log("route", this.router.url.toString());
    //   this.tableToShow = "movimientos";
    // }

    var holdUrl = this.router.url.toString();

    switch (holdUrl) {
      case "/dashboard-tables/movimientos":
        this.tableToShow = "movimientos";
        this.sendAdopterType = "default";
        break;
      case "/dashboard-tables/movimientos/ingresos":
        this.tableToShow = "movimientos";
        this.sendAdopterType = "ingresos";
        break;
      case "/dashboard-tables/movimientos/egresos":
        this.tableToShow = "movimientos";
        this.sendAdopterType = "egresos";
        break;
      case "/dashboard-tables/movimientos/donaciones":
        this.tableToShow = "movimientos";
        this.sendAdopterType = "donaciones";
        break;
      case "/dashboard-tables/voluntarios":
        this.tableToShow = "voluntarios";
        break;
      case "/dashboard-tables/adoptantes":
        this.tableToShow = "adoptantes";
        this.sendAdopterType = "default";
        break;
      case "/dashboard-tables/adoptantes/espera":
        this.tableToShow = "adoptantes";
        this.sendAdopterType = "espera";
        break;
      case "/dashboard-tables/adoptantes/malosadoptantes":
        this.tableToShow = "adoptantes";
        this.sendAdopterType = "malos";
        break;
      default:
        this.router.navigate(["/dashboard"]);
        break;
    }

  }

  getEmitter(event)
  {
    if (event != undefined) //  ESTE CONDICIONAL LO COLOQUE POR QUE SE TRIGEREABA SOLO Y DESAPARECIA A LOS 6 SEGUNDOS
    {
      // this.step = event;
      // console.log("si se recibe el tipo", event);
    }
  }
}
