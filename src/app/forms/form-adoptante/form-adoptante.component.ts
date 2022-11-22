import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { debounceTime, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/Services/alert.service';
import { AdopterService } from 'src/app/Services/adopter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-adoptante',
  templateUrl: './form-adoptante.component.html',
  styleUrls: ['./form-adoptante.component.css']
})
export class FormAdoptanteComponent implements OnInit {

  formGroup: FormGroup;
  checked = false;

  calificaciones = [
    {label: "BAD", name: "Mala"},
    {label: "GOOD", name: "Buena"}
  ];

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private adoptanteService: AdopterService,
    private router: Router,
  )
  { }

  async ngOnInit() {

    this.formGroup = this.fb.group({
      dni: [ "", Validators.compose([ Validators.required, Validators.maxLength(11) ]) ],
      nombre: [ "", Validators.compose([ Validators.required, Validators.maxLength(25) ]) ],
      apellido: [ "", Validators.compose([ Validators.required, Validators.maxLength(25) ]) ],
      edad: [ "" ],
      // organizacion: [ "", Validators.compose([ Validators.required, Validators.maxLength(25) ]) ],
      provincia: [ "", Validators.compose([ Validators.required, Validators.maxLength(25) ]) ],
      ciudad: [ "", Validators.compose([ Validators.required, Validators.maxLength(25) ]) ],
      localidad: [ "", Validators.compose([ Validators.required, Validators.maxLength(25) ]) ],
      calificacion: [ "", Validators.compose([ Validators.required, Validators.maxLength(25) ]) ],
      enEspera: [ "", Validators.compose([ Validators.required, Validators.maxLength(25) ]) ]
    });

    this.formGroup.get("enEspera").setValue("NO" );

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
        this.formGroup.get("enEspera").setValue("YES" );
        break;
      case false:
        this.formGroup.get("enEspera").setValue("NO" );
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
      const body = JSON.stringify({
        'dni': this.formGroup.get("dni").value,
        'nombre': this.formGroup.get("nombre").value,
        'apellido': this.formGroup.get("apellido").value,
        'edad': this.formGroup.get("edad").value,
        'organizacionId':'1',
        'provincia': this.formGroup.get("provincia").value,
        'ciudad': this.formGroup.get("ciudad").value,
        'localidad': this.formGroup.get("localidad").value,
        'calificacion': this.formGroup.get("calificacion").value,
        'enEspera': this.formGroup.get("enEspera").value
      });

      this.adoptanteService.post(body).subscribe(x => {
        this.alertService.show("Adoptante registrado correctamente");

        this.formGroup.reset();
        this.checked = false;
        this.formGroup.get("enEspera").setValue("NO");
        this.router.navigate(['/dashboard']);
      })
    }
  }
}
