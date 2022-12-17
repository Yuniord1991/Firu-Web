import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, MatSort } from '@angular/material';
import { debounceTime, tap } from 'rxjs/operators';
import { AdopterEsperaService } from 'src/app/Services/adopter-espera.service';

@Component({
  selector: 'app-adoptantes-espera-table',
  templateUrl: './adoptantes-espera-table.component.html',
  styleUrls: ['./adoptantes-espera-table.component.css']
})
export class AdoptantesEsperaTableComponent implements OnInit {

  formGroup: FormGroup;
  dataTable;
  dataTableLength;

  displayedColumns = [
    "nombre",
    "telefono",
    "ciudad",
    "especie",
    "raza",
    "tamano",
    "color",
    "edad",
  ];

  especie = [
    {label: "Perro", name: "Perro"},
    {label: "Gato", name: "Gato"}
  ];

  edad = [
     1,2,3,4,5,6,7,8,9,10,11,12,13,14,15
  ];

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private adoptanteEsperaService: AdopterEsperaService
  )
  { }

  async ngOnInit() {

    this.formGroup = this.fb.group({
      nombre: null,
      telefono: null,
      ciudad: null,
      especie: null,
      raza: null,
      tamano: null,
      color: null,
      edad: null
    });

    await this.loadTable();

    this.formGroup.valueChanges.pipe(debounceTime(1000)).subscribe(change => {
      this.loadTable();
    });
  }

  loadTable()
  {
    this.adoptanteEsperaService.GetAllAdoptantesEsperaForTable(
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.formGroup.get("nombre").value,
      this.formGroup.get("telefono").value,
      this.formGroup.get("ciudad").value,
      this.formGroup.get("especie").value,
      this.formGroup.get("raza").value,
      this.formGroup.get("tamano").value,
      this.formGroup.get("color").value,
      this.formGroup.get("edad").value
    ).subscribe( data => {
      console.log("respuesta ", data);
      this.dataTable = data.adoptantesEspera;
      this.dataTableLength = data.length;

    });
  }
}
