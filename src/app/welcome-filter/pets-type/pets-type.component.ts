import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {transition, trigger, state, query, style, animate, group, stagger, animateChild, keyframes} from '@angular/animations';
import { PetsTableComponent } from '../pets-table/pets-table.component';
import { PetsService } from 'src/app/Services/pets.service';

@Component({
  selector: 'app-pets-type',
  templateUrl: './pets-type.component.html',
  styleUrls: ['./pets-type.component.css'],
  animations: [
    trigger('popState',[
      state('fadeIn', style({
        opacity:1,
      })),
      state('fadeOut', style({
        opacity:0,
        transform: 'translateY(-100%)'
      })),
      transition('* <=> fadeOut', animate('300ms ease-out')),
      transition('fadeIn <=> fadeOut', animate('3s ease-out')),
      transition('fadeOut <=> fadeIn', animate('2s ease-in'))
    ]),
    trigger('popState2',[
      state('fadeOut', style({
        opacity:0,
        transform: 'translateY(-100%)'
      })),
      transition('* <=> fadeOut', animate('300ms ease-out'))
    ])
  ]
})
export class PetsTypeComponent implements OnInit {

  petTypeSelected:string;
  step: string;
  result;
  animationstate = "";
  animationstate2 = "";
  @Output()
  petTypeEmitter= new EventEmitter<string>();

  cargar: PetsTableComponent;

  constructor(
    private service: PetsService
  ) { }

  ngOnInit() {

  }

  triggerSelected(typeOfPet)
  {
    this.service.getAllMascotasForTable(
      "",
      "",
      0,
      50,
      typeOfPet,
      "",
      "",
      ""
      ).subscribe( data => {
        this.result = data.length;

        // if(data.length < 10)
        // {
        //   this.result = "0" + data.Length;
        // }

        this.petTypeSelected = typeOfPet;
        this.animationstate = "fadeOut";

        setTimeout(() => {this.animateValue(99, this.result, 2000);this.step = 'done';}, 100);
    });


  }

  animateValue( start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      this.result = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setTimeout(() =>
        {
          // console.log("se disparatimeout ");
          this.animationstate2 = "fadeOut"; this.emit()
        },
          1200
        );
      }
    };
    window.requestAnimationFrame(step);
  }

  emit()
  {
    // console.log("this.petTypeSelected", this.petTypeSelected);
    setTimeout(() => {this.petTypeEmitter.emit(this.petTypeSelected);}, 600);
  }
}
