import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, MatSort } from '@angular/material';
import { debounceTime, tap } from 'rxjs/operators';
import { AdopterService } from 'src/app/Services/adopter.service';

@Component({
  selector: 'app-adoptantes-table',
  templateUrl: './adoptantes-table.component.html',
  styleUrls: ['./adoptantes-table.component.css']
})
export class AdoptantesTableComponent implements OnInit {

  formGroup: FormGroup;
  dataTable;
  dataTableLength;

  displayedColumns = [
    "dni",
    "nombre",
    "apellido",
    "edad",
    "provincia",
    "ciudad",
    "localidad",
    "calificacion",
    "enEspera",
  ];

  calificaciones = [
    {label: "BAD", name: "Mala"},
    {label: "GOOD", name: "Buena"}
  ];

  isEspera = [
    {label: "YES", name: "Si"},
    {label: "NO", name: "No"},
  ];

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  @Input()
  tipoSelected: string = null;

  constructor(
    private fb: FormBuilder,
    private adoptanteService: AdopterService
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
      localidad: null,
      calificacion: null,
      enEspera: null
    });

    switch (this.tipoSelected) {
      case "default":

        break;
      case "espera":
        this.formGroup.get("enEspera").setValue("YES");
        break;
      case "malos":
        this.formGroup.get("calificacion").setValue("BAD");
        break;
      default:
        break;
    }
    await this.loadTable();

    this.formGroup.valueChanges.pipe(debounceTime(1000)).subscribe(change => {
      this.loadTable();
    });
  }

  caseSwitch(event)
  {
    switch (event) {
      case "GOOD":
        return "Buena";
      case "BAD":
        return "Mala";
      case "NO":
        return "No";
      case "YES":
        return "Si";
      default:
        break;
    }
  }

  loadTable()
  {
    this.adoptanteService.GetAllAdoptantesForTable(
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.formGroup.get("dni").value,
      this.formGroup.get("nombre").value,
      this.formGroup.get("apellido").value,
      this.formGroup.get("edad").value,
      this.formGroup.get("provincia").value,
      this.formGroup.get("ciudad").value,
      this.formGroup.get("localidad").value,
      this.formGroup.get("calificacion").value,
      this.formGroup.get("enEspera").value
    ).subscribe( data => {
      console.log("respuesta ", data);
      this.dataTable = data.adoptantes;
      this.dataTableLength = data.length;
      console.log("this.specieSelected ", this.dataTable);

    });
  }
}
