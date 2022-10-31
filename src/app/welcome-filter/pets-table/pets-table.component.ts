import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, MatSort } from '@angular/material';
import { PetsService } from 'src/app/Services/pets.service';

@Component({
  selector: 'app-pets-table',
  templateUrl: './pets-table.component.html',
  styleUrls: ['./pets-table.component.css']
})
export class PetsTableComponent implements OnInit {

  formGroup: FormGroup;
  dataTable;
  dataTableLength;

  displayedColumns = [
    "nombre",
    "especie",
    "tamano",
    "edad",
    "ciudad",
  ];

  species = [
    "Gato", "Perro"
  ];

  sizes = [
    { id: 1, label: "Pequeño" },
    { id: 2, label: "Mediano" },
    { id: 3, label: "Grande" }
  ];

  ages = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

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

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  @Input()
  specieSelected: string = null;
  constructor(
    private fb: FormBuilder,
    private service: PetsService
  )
  { }

  async ngOnInit() {

    this.formGroup = this.fb.group({
      specie: null,
      city: null,
      size: null,
      age: null
    });

    if(this.specieSelected != undefined)
    {
      switch (this.specieSelected) {
        case "DOG":
          this.formGroup.get("specie").setValue("Perro");
          break;
        case "CAT":
          this.formGroup.get("specie").setValue("Gato");
          break;
        default:
          break;
      }
    }

    await this.loadTable();

    this.formGroup.valueChanges.subscribe(x=>{
      this.loadTable();
    });

  }

  loadTable()
  {

    var specie = this.formGroup.get("specie").value;
    switch (specie) {
      case "Perro":
        this.specieSelected = "DOG";
        break;
      case "Gato":
        this.specieSelected = "CAT";
        break;
      case null:
        this.specieSelected = "";
        break;
      default:
        break;
    }

    this.service.getAllMascotasForTable(
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.specieSelected,
      this.formGroup.get("city").value,
      this.formGroup.get("size").value,
      this.formGroup.get("age").value
    ).subscribe( data => {
      console.log("respuesta ", data);
      this.dataTable = data.mascotas;
      this.dataTableLength = data.length;
      console.log("this.specieSelected ", this.dataTable);

    });
  }

  convertSize(tamano)
  {
    switch (tamano) {
      case 1:
        return "Pequeño";
        break;
      case 2:
        return "Mediano";
        break;
      case 3:
        return "Grande";
        break;
      default:
        break;
    }
  }
}
