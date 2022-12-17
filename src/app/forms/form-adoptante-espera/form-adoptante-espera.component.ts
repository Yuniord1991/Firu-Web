import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { debounceTime, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/Services/alert.service';
import { Router } from '@angular/router';
import { AdopterEsperaService } from 'src/app/Services/adopter-espera.service';

@Component({
  selector: 'app-form-adoptante-espera',
  templateUrl: './form-adoptante-espera.component.html',
  styleUrls: ['./form-adoptante-espera.component.css']
})
export class FormAdoptanteEsperaComponent implements OnInit {

  formGroup: FormGroup;

  especie = [
    {label: "Perro", name: "Perro"},
    {label: "Gato", name: "Gato"}
  ];

  tamano = [
    {label: "Pequeño", value:"Pequeño"},
    {label: "Mediano", value:"Mediano"},
    {label: "Grande", value:"Grande"},
  ]

  edad = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private adoptanteEsperaService: AdopterEsperaService,
    private router: Router,
  )
  { }

  async ngOnInit() {

    this.formGroup = this.fb.group({
      nombre: [ "", Validators.compose([ Validators.required, Validators.maxLength(25) ]) ],
      telefono: [ "", Validators.compose([ Validators.required, Validators.maxLength(25) ]) ],
      ciudad: [ "", Validators.compose([ Validators.required, Validators.maxLength(25) ]) ],
      especie: [ "", Validators.compose([ Validators.maxLength(25) ]) ],
      raza: [ "", Validators.compose([ Validators.maxLength(25) ]) ],
      tamano: [ "", Validators.compose([ Validators.maxLength(25) ]) ],
      color: [ "", Validators.compose([ Validators.maxLength(25) ]) ],
      edad: [ "" ],
    });

    this.formGroup.valueChanges.pipe(debounceTime(1000)).subscribe(x=>{
      console.log("hhhhhhhhhhh", this.formGroup.value);
      console.log("formgroup", this.formGroup);
    });
  }

  register()
  {
    if(!this.formGroup.invalid)
    {
      var age = this.formGroup.get("edad").value;
      const body = JSON.stringify({
        'nombre': this.formGroup.get("nombre").value,
        'telefono': this.formGroup.get("telefono").value,
        'ciudad': this.formGroup.get("ciudad").value,
        'especie': this.formGroup.get("especie").value,
        'raza': this.formGroup.get("raza").value,
        'tamano': this.formGroup.get("tamano").value,
        'color': this.formGroup.get("color").value,
        'edad': age.toString()
      });

      this.adoptanteEsperaService.post(body).subscribe(x => {
        this.alertService.show("Adoptante en espera registrado correctamente");

        this.formGroup.reset();
        this.router.navigate(['/dashboard']);
      })
    }
  }
}
