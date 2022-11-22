import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { debounceTime, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/Services/alert.service';
import { Router } from '@angular/router';
import { PetsService } from 'src/app/Services/pets.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-form-mascota',
  templateUrl: './form-mascota.component.html',
  styleUrls: ['./form-mascota.component.css']
})
export class FormMascotaComponent implements OnInit {

  formGroup: FormGroup;
  checked = false;

  species = [
    {label: "DOG", name: "Perro"},
    {label: "CAT", name: "Gato"}
  ];

  sizes = [
    { id: 1, label: "Pequeño" },
    { id: 2, label: "Mediano" },
    { id: 3, label: "Grande" }
  ];

  ages = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];

  cities = [
    { label: "Cordoba" },
    { label: "San Juan" },
    { label: "Buenos Aires" },
    { label: "La Rioja" },
    { label: "San Luis" },
    { label: "Entre Rios" },
    { label: "Misiones" },
    { label: "Corrientes" },
    { label: "Salta" },
    { label: "Jujuy" }
  ];

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private mascotaService: PetsService,
    private router: Router,
  )
  { }

  async ngOnInit() {

    this.formGroup = this.fb.group({
      nombre: [ "", Validators.compose([ Validators.required, Validators.maxLength(15) ]) ],
      especie: [ "", Validators.compose([ Validators.required, Validators.maxLength(25) ]) ],
      raza: [ "", Validators.compose([ Validators.required, Validators.maxLength(25) ]) ],
      tamano: [ "", Validators.compose([ Validators.required, Validators.maxLength(25) ]) ],
      peso: [ ""],
      edad: [ ""],
      castrado: [ "", Validators.compose([ Validators.required, Validators.maxLength(25) ]) ],
      ciudad: [ "", Validators.compose([ Validators.required, Validators.maxLength(25) ]) ]

    });

    this.formGroup.get("castrado").setValue("false");

    this.formGroup.valueChanges.pipe(debounceTime(1000)).subscribe(x=>{
      console.log("hhhhhhhhhhh", this.formGroup.value);
    });
  }

  assignCheck()
  {
    // console.log("entry check", this.checked)

    this.checked = !this.checked;
    switch (this.checked) {
      case true:
        this.formGroup.get("castrado").setValue("true");
        break;
      case false:
        this.formGroup.get("castrado").setValue("false");
        break;
      default:
        break;
    };
    // console.log("final check", this.checked)
  }

  register()
  {
    if(!this.formGroup.invalid)
    {
      var toDot = this.formGroup.get("peso").value;
      var toDot1 = this.formGroup.get("raza").value;
      var toDot2 = this.formGroup.get("edad").value;
      var toDot3 = this.formGroup.get("castrado").value;
      var toDot4 = this.formGroup.get("tamano").value;
      var toDot5 = this.formGroup.get("especie").value;
      var toDot6 = this.formGroup.get("ciudad").value;
      toDot = toDot.replace(",", ".");

      const body = JSON.stringify({
        "nombre": this.formGroup.get("nombre").value,
        "raza": this.formGroup.get("raza").value,
        "edad": (this.formGroup.get("edad").value).toString(),
        "peso": toDot.toString(),
        "castrado": (this.formGroup.get("castrado").value).toString(),
        "tamano": (this.formGroup.get("tamano").value).toString(),
        "especie": this.formGroup.get("especie").value,
        "responsableId": "1",
        "ciudad": this.formGroup.get("ciudad").value,
      });

      this.mascotaService.post(body).subscribe(x => {
        this.alertService.show("Mascota registrada correctamente");

        this.formGroup.reset();
        this.router.navigate(['/dashboard']);
      })
    }
  }
}
