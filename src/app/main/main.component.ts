import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  sendLogged;
  constructor() { }

  ngOnInit()
  {
    let sessionsExistent = JSON.parse(localStorage.getItem("userLogged"));

    if(sessionsExistent != null && sessionsExistent != undefined)
    {
      console.log("usuario logueado ", sessionsExistent);
      this.sendLogged = sessionsExistent;
    }
    else
    {
      this.sendLogged = false;
    }
  }

}
