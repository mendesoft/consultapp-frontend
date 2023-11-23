import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RouterLink, RouterOutlet } from '@angular/router';
import { switchMap } from 'rxjs';
import { MaterialModule } from 'src/app/material/material/material.module';
import { Paciente } from 'src/app/model/paciente';
import { PacienteService } from 'src/app/services/paciente.service';
@Component({
  selector: 'app-paciente',
  standalone:true,
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css'],
  imports:[MaterialModule,NgFor,RouterLink, RouterOutlet,NgIf]
})
export class PacienteComponent implements OnInit{


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  totalElement:number = 0;

  constructor(
    private service:PacienteService,
    private _snackBar:MatSnackBar
    ){}


  displayedColumns: string[] = ['idPaciente', 'nombres', 'apellidos', 'acciones'];
  dataSource?: MatTableDataSource<Paciente>;


  pacientes:Paciente[] = [];

  ngOnInit(): void {

    this.service.getPacienteChange().subscribe(data => {
      this.createTable(data);
    });


    //Cargar cuando inica
    this.service.paginacion(0,10).subscribe(data => {
      this.totalElement = data.totalElements;
      this.createTable(data.content);
    })

    //Mensaje
    this.service.getMensajeChange().subscribe(data => {
      this._snackBar.open(data, 'INFO', { duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'});
    });


}

  applyFilter(e:any){
      this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  createTable(data:Paciente[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort
  }

  eliminarPorId(idPaciente:number){
    this.service.eliminarPorId(idPaciente)
    .pipe(switchMap(()=> this.service.listar()))
    .subscribe(data => {
      this.createTable(data);
      this.service.setMensajeChange('DELETE!');
    })
  }

  showMore(e:any){
    this.service.paginacion(e.pageIndex, e.pageSize).subscribe(data => {
      this.totalElement=data.totalElements;
      this.createTable(data.content);
    })
  }

}
