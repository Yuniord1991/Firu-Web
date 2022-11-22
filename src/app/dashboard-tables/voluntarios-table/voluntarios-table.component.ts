import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, MatSort } from '@angular/material';
import { debounceTime, tap } from 'rxjs/operators';
import { VolunteerService } from 'src/app/Services/volunteer.service';

@Component({
  selector: 'app-voluntarios-table',
  templateUrl: './voluntarios-table.component.html',
  styleUrls: ['./voluntarios-table.component.css']
})
export class VoluntariosTableComponent implements OnInit {

  formGroup: FormGroup;
  dataTable;
  dataTableLength;

  displayedColumns = [
    "dni",
    "nombre",
    "apellido",
    "edad",
    // "organizacion",
    "provincia",
    "ciudad",
    "localidad",
  ];

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private voluntarioService: VolunteerService
  )
  { }

  async ngOnInit() {

    this.formGroup = this.fb.group({
      dni: null,
      nombre: null,
      apellido: null,
      edad: null,
      organizacion: null,
      provincia: null,
      ciudad: null,
      localidad: null
    });

    await this.loadTable();

    this.formGroup.valueChanges.pipe(debounceTime(1000)).subscribe(change => {
      this.loadTable();
    });

  }

  loadTable()
  {
    this.voluntarioService.GetAllVoluntariosForTable(
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.formGroup.get("dni").value,
      this.formGroup.get("nombre").value,
      this.formGroup.get("apellido").value,
      this.formGroup.get("edad").value,
      this.formGroup.get("organizacion").value,
      this.formGroup.get("provincia").value,
      this.formGroup.get("ciudad").value,
      this.formGroup.get("localidad").value
    ).subscribe( data => {
      console.log("respuesta ", data);
      this.dataTable = data.voluntarios;
      this.dataTableLength = data.length;
      console.log("this.specieSelected ", this.dataTable);

    });
  }
}
