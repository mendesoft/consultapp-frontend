import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MaterialModule } from 'src/app/material/material/material.module';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Especialidad } from 'src/app/model/especialidad';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-especialidad',
  standalone: true,
  imports:[MaterialModule,NgFor,RouterLink, RouterOutlet,NgIf],
  templateUrl: './especialidad.component.html',
  styleUrl: './especialidad.component.css'
})
export class EspecialidadComponent implements OnInit{


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  totalElement:number = 0;

  constructor(
    private service:EspecialidadService,
    private _snackBar:MatSnackBar
    ){}


  displayedColumns: string[] = ['idEspecialidad', 'nombre', 'acciones'];
  dataSource?: MatTableDataSource<Especialidad>;


  especialidades:Especialidad[] = [];

  ngOnInit(): void {

    this.service.getEspecialidadChange().subscribe(data => {
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
      this.dataSource.filter = e.target.value.trim();
  }

  createTable(data:Especialidad[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort
  }

  eliminarPorId(idEspecialidad:number){
    this.service.eliminarPorId(idEspecialidad)
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
