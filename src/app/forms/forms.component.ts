import { Component, OnInit } from '@angular/core';
import {transition, trigger, state, query, style, animate, group, stagger, animateChild, keyframes} from '@angular/animations';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  formToShow;
  sendAdopterType;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {

    var holdUrl = this.router.url.toString();

    switch (holdUrl) {
      case "/forms/mascota":
        this.formToShow = "mascota";
        break;
      case "/forms/movimiento":
        this.formToShow = "movimiento";
        break;
      case "/forms/voluntario":
        this.formToShow = "voluntario";
        break;
      case "/forms/adoptante":
        this.formToShow = "adoptante";
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
