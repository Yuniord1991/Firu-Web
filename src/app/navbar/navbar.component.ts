import { trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  // animations: [
  //   trigger("detailExpand", [
  //     state("collapsed", style({ height: "0px", minHeight: "0" })),
  //     state("expanded", style({ height: "*" })),
  //     transition(
  //       "expanded <=> collapsed",
  //       animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
  //     ),
  //   ]),
  // ],
})

export class NavbarComponent implements OnInit {

  @Input()
  userLogged: any = null;

  showUser: boolean = false;

  constructor() { }

  ngOnInit() {
    // if (this.userLogged.userLogged.userName != undefined && this.userLogged.userLogged.userName != null )
    if (this.userLogged != false)
    {
      this.showUser = true;
      console.log("this.showUser", this.showUser)
    }
    else
    {
      this.showUser = false;
    }
  }

  closeSession()
  {
    localStorage.removeItem("userLogged");
    this.showUser = false;
  }

}
