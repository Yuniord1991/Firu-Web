import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { debounceTime, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/Services/alert.service';
import { Router } from '@angular/router';
import { MovimientoService } from 'src/app/Services/movimiento.service';

@Component({
  selector: 'app-form-movimiento',
  templateUrl: './form-movimiento.component.html',
  styleUrls: ['./form-movimiento.component.css']
})
export class FormMovimientoComponent implements OnInit {

  formGroup: FormGroup;
  checked = false;

  calificaciones = [
    {label: "BAD", name: "Mala"},
    {label: "GOOD", name: "Buena"}
  ];

  tipos = [
    "Ingresos", "Egresos", "Donaciones"
  ];

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private movimientoService: MovimientoService,
    private router: Router,
  )
  { }

  async ngOnInit() {

    this.formGroup = this.fb.group({
      tipo: [ "", Validators.compose([ Validators.required, Validators.maxLength(11) ]) ],
      remitente: [ "", Validators.compose([ Validators.required, Validators.maxLength(25) ]) ],
      destino: [ "", Validators.compose([ Validators.required, Validators.maxLength(25) ]) ],
      motivo: [ "", Validators.compose([ Validators.required, Validators.maxLength(25) ]) ],
      fecha: [ "", Validators.compose([ Validators.required, Validators.maxLength(25) ]) ],
      monto: [ ""],
      direccionRemitente: [ "", Validators.compose([ Validators.required, Validators.maxLength(25) ]) ],
      direccionDestino: [ "", Validators.compose([ Validators.required, Validators.maxLength(25) ]) ],
    });

    this.formGroup.valueChanges.pipe(debounceTime(1000)).subscribe(x=>{
      console.log("hhhhhhhhhhh", this.formGroup.value);
    });
  }

  register()
  {
    if(!this.formGroup.invalid)
    {
      const body = JSON.stringify({
        "tipo": this.formGroup.get("tipo").value,
        "remitente": this.formGroup.get("remitente").value,
        "destino": this.formGroup.get("destino").value,
        "motivo": this.formGroup.get("motivo").value,
        "fecha": this.formGroup.get("fecha").value,
        "monto": this.formGroup.get("monto").value,
        "direccionRemitente": this.formGroup.get("direccionRemitente").value,
        "direccionDestino": this.formGroup.get("direccionDestino").value
      });

      this.movimientoService.post(body).subscribe(x => {
        this.alertService.show("Movimiento registrado correctamente");

        this.formGroup.reset();
        this.router.navigate(['/dashboard']);
      })
    }
  }
}
