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

    if(sessionsExistent.login != null && sessionsExistent.login != undefined && sessionsExistent.login == true)
    {
      console.log("usuario logueado ", sessionsExistent);
      this.sendLogged = sessionsExistent;
    }
  }

}
