import { Component, OnInit } from '@angular/core';
import {transition, trigger, state, query, style, animate, group, stagger, animateChild, keyframes} from '@angular/animations';

@Component({
  selector: 'app-welcome-filter',
  templateUrl: './welcome-filter.component.html',
  styleUrls: ['./welcome-filter.component.css'],
  animations: [
    trigger('rounding',[
      state('start', style({
        opacity:1
      })),
      state('nope', style({}))
    ])
  ]
})
export class WelcomeFilterComponent implements OnInit {

  startTitle = false;

  constructor() { }

  ngOnInit() {
    this.startTitle = true;
  }

  get getStartCommand()
  {
    return this.startTitle ? "start": "nope";
  }
}
