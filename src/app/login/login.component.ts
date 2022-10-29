import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  inicioForm: FormGroup;
  registroForm: FormGroup;

  indexTab = true;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.registroForm = this.fb.group({
      nombre: null,
      apellido: null,
      usuario: null,
      email: null,
      contraseña: null,
    });

    this.inicioForm = this.fb.group({
      usuario: null,
      contraseña: null,
    });
  }

  selectedTab(event)
  {
    switch (event) {
      case 0:
        this.indexTab = true;
        break;
      case 1:
        this.indexTab = false;
        break;
      default:
        break;
    }
    console.log(this.indexTab);
  }
}
