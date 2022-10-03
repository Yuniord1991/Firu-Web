import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-carousel',
  templateUrl: './welcome-carousel.component.html',
  styleUrls: ['./welcome-carousel.component.css']
})
export class WelcomeCarouselComponent implements OnInit {

  constructor(
    private router: Router
  )
  { }

  ngOnInit() {
  }

  toFilterPage()
  {
    this.router.navigate(["/filter"]);
  }
}
