import { Component, OnInit } from '@angular/core';
import {transition, trigger, state, query, style, animate, group, stagger, animateChild, keyframes} from '@angular/animations';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-welcome-filter',
  templateUrl: './welcome-filter.component.html',
  styleUrls: ['./welcome-filter.component.css'],
  animations: [
    // trigger('rounding',[
    //   state('start', style({
    //     opacity:1
    //   })),
    //   state('nope', style({}))
    // ])
  ]
})
export class WelcomeFilterComponent implements OnInit {

  startTitle = false;
  step: string;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.startTitle = true;

    if (this.router.url.toString().includes("/filter")) {
      // console.log("route", this.router.url.toString());
      this.step = "petType";
    }
  }

  get getStartCommand()
  {
    return this.startTitle ? "start": "nope";
  }

  getEmitter(event)
  {
    if (event != undefined) //  ESTE CONDICIONAL LO COLOQUE POR QUE SE TRIGEREABA SOLO Y DESAPARECIA A LOS 6 SEGUNDOS
    {
      this.step = event;
      // console.log("si se recibe el tipo", event);
    }
  }
}
