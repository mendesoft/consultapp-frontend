import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs';
import { MaterialModule } from 'src/app/material/material/material.module';
import { Medico } from 'src/app/model/medico';
import { MedicoService } from 'src/app/services/medico.service';
import { MedicoDialogComponent } from './medico-dialog/medico-dialog.component';

@Component({
  selector: 'app-medico',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './medico.component.html',
  styleUrl: './medico.component.css'
})
export class MedicoComponent implements OnInit{
  displayedColumns: string[] = ['idMedico', 'nombres', 'apellidos', 'acciones'];
  totalElement:number = 0;

  dataSource: MatTableDataSource<Medico>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private service = inject(MedicoService);
  private _dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  ngOnInit(): void {

    this.service.getMedicoChange().subscribe(data => {
      this.createTable(data);
    });
    //Cargar cuando inica
    this.service.paginacion(0,10).subscribe(data => {
      this.totalElement = data.totalElements;
      this.createTable(data.content);
    })

    //Mensaje
    this.service.getMensajeChange().subscribe(data => {
      this._snackBar.open(data, 'INFO', { duration: 2000, horizontalPosition: 'center', verticalPosition: 'bottom'});
    });

  }

  applyFilter(e: any) {
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  createTable(data: Medico[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort
  }

  openDialog(medic?: Medico) {
    this._dialog.open(MedicoDialogComponent, {
      width: '350px',
      data: medic,
      disableClose: true
    });
  }

  eliminarPorId(idMedico: number) {
    this.service.eliminarPorId(idMedico)
      .pipe(switchMap( ()=> this.service.listar() ))
      .subscribe(data => {
        this.service.setMedicoChange(data);
        this.service.setMensajeChange('DELETED!');
      });
  }

  showMore(e:any){
    this.service.paginacion(e.pageIndex, e.pageSize).subscribe(data => {
      this.totalElement=data.totalElements;
      this.createTable(data.content);
    })
  }

}
