import {transition, trigger, state, query, style, animate, group, stagger, animateChild, keyframes} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whatsapp-button',
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.scss'],
  // animations: [
  //   trigger('popState',[
  //     state('fadeIn', style({
  //       opacity:1,
  //     })),
  //     state('fadeOut', style({
  //       opacity:0,
  //       transform: 'translateY(-100%)'
  //     })),
  //     transition('* <=> fadeOut', animate('4ms ease-out')),
  //     transition('* <=> fadeIn', animate('4s ease-in')),
  //     transition('fadeIn <=> fadeOut', animate('3s ease-out')),
  //     transition('fadeOut <=> fadeIn', animate('2s ease-in'))
  //   ]),
  //   trigger('popState2',[
  //     state('fadeOut', style({
  //       opacity:0,
  //       transform: 'translateY(-100%)'
  //     })),
  //     transition('* <=> fadeOut', animate('300ms ease-out'))
  //   ])
  // ]
})
export class WhatsappButtonComponent implements OnInit {


  hiperVinculo = `https://google.com`;
  iconValid: boolean;
  close = false;

  constructor(
  ) { }

  ngOnInit() {
    this.GetUser();
  }

  GetUser() {
    // this.authService
    //   .getFullName(this.authService.getUserId())
    //   .subscribe((data) => {
    //     let userData: any = data;
    //     if (userData.tieneLogos) {
    //       // this.imageUrl = userData.imagenHomeUrl;
    //       this.iconValid = false;
    //     } else {
    //       // this.imageUrl = "../../assets/images/tlpHome.png";
    //       this.iconValid = true;
    //     }
    //   });
    this.iconValid = true;
  }
}
