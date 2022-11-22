import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { debounceTime, tap } from 'rxjs/operators';
import { VolunteerService } from 'src/app/Services/volunteer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/Services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-voluntario',
  templateUrl: './form-voluntario.component.html',
  styleUrls: ['./form-voluntario.component.css']
})
export class FormVoluntarioComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private voluntarioService: VolunteerService,
    private router: Router
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
      localidad: [ "", Validators.compose([ Validators.required, Validators.maxLength(25) ]) ]
    });
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
        'localidad': this.formGroup.get("localidad").value
      });

      this.voluntarioService.post(body).subscribe(x => {
        this.alertService.show("Voluntario registrado correctamente");

        this.formGroup.reset();
        this.router.navigate(['/dashboard']);
      })
    }
  }
}
