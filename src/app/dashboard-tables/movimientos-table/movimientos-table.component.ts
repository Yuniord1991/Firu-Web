import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, MatSort } from '@angular/material';
import { debounceTime, tap } from 'rxjs/operators';
import { MovimientoService } from 'src/app/Services/movimiento.service';

@Component({
  selector: 'app-movimientos-table',
  templateUrl: './movimientos-table.component.html',
  styleUrls: ['./movimientos-table.component.css']
})
export class MovimientosTableComponent implements OnInit {

  formGroup: FormGroup;
  dataTable;
  dataTableLength;

  displayedColumns = [
    "tipo",
    "remitente",
    "destino",
    "motivo",
    "fecha",
    "monto",
    "direccionRemitente",
    "direccionDestino",
  ];

  tipos = [
    "Ingresos", "Egresos", "Donaciones"
  ];

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  @Input()
  tipoSelected: string = null;
  constructor(
    private fb: FormBuilder,
    private movimientoService: MovimientoService
  )
  { }

  async ngOnInit() {

    this.formGroup = this.fb.group({
      tipo: null,
      remitente: null,
      destino: null,
      motivo: null,
      fecha: null,
      monto: null
    });

    if(this.tipoSelected != undefined)
    {
      switch (this.tipoSelected) {
        case "ingresos":
          this.formGroup.get("tipo").setValue("Ingresos");
          break;
        case "egresos":
          this.formGroup.get("tipo").setValue("Egresos");
          break;
        case "donaciones":
          this.formGroup.get("tipo").setValue("Donaciones");
          break;
        default:
          break;
      }
    }

    await this.loadTable();

    this.formGroup.valueChanges.pipe(debounceTime(1000)).subscribe(change => {

      var holdDate: Date = this.formGroup.get("fecha").value;
      if (holdDate != undefined && holdDate != null)
      {
        holdDate.setHours(0);
        holdDate.setUTCHours(0);
        this.formGroup.get("fecha").setValue(holdDate, { onlySelf: true, emitEvent: false } );
      }

      this.loadTable();
    });

  }

  loadTable()
  {

    var type = this.formGroup.get("tipo").value;
    switch (type) {
      case "Ingresos":
        this.tipoSelected = "INGRESO";
        break;
      case "Egresos":
        this.tipoSelected = "EGRESO";
        break;
      case "Donaciones":
        this.tipoSelected = "DONACION";
        break;
      case null:
        this.tipoSelected = "";
        break;
      default:
        break;
    }

    var holdDate: Date = this.formGroup.get("fecha").value;


    this.movimientoService.getAllMovimientosForTable(
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.tipoSelected,
      this.formGroup.get("remitente").value,
      this.formGroup.get("destino").value,
      this.formGroup.get("motivo").value,
      this.formGroup.get("fecha").value,
      this.formGroup.get("monto").value
    ).subscribe( data => {
      console.log("respuesta ", data);
      this.dataTable = data.movimientos;
      this.dataTableLength = data.length;
      console.log("this.specieSelected ", this.dataTable);

    });
  }
}
