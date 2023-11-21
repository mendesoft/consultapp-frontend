import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MaterialModule } from 'src/app/material/material/material.module';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExamenService } from 'src/app/services/examen.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Examen } from 'src/app/model/examen';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-examen',
  standalone: true,
  templateUrl: './examen.component.html',
  styleUrl: './examen.component.css',
  imports:[MaterialModule,NgFor,RouterLink, RouterOutlet,NgIf]
})
export class ExamenComponent implements OnInit{


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort:MatSort;

  totalElement:number = 0;

  constructor(
    private service:ExamenService,
    private _snackBar:MatSnackBar
    ){}


  displayedColumns: string[] = ['idExamen', 'nombre', 'acciones'];
  dataSource?: MatTableDataSource<Examen>;


  examenes:Examen[] = [];

  ngOnInit(): void {

    this.service.getExamenChange().subscribe(data => {
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

  createTable(data:Examen[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort
  }

  eliminarPorId(idExamen:number){
    this.service.eliminarPorId(idExamen)
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
