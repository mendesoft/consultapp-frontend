import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MaterialModule } from 'src/app/material/material/material.module';
import { FormsModule } from '@angular/forms';
import { Medico } from 'src/app/model/medico';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MedicoService } from 'src/app/services/medico.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-medico-dialog',
  standalone: true,
  imports: [ MaterialModule, FormsModule, NgIf ],
  templateUrl: './medico-dialog.component.html',
  styleUrl: './medico-dialog.component.css'
})
export class MedicoDialogComponent implements OnInit{

  medico: Medico;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Medico,
    private _dialogRef: MatDialogRef<MedicoDialogComponent>,
    private medicoService: MedicoService
  ){

  }

  ngOnInit(): void {
    this.medico = {...this.data};
  }

  operate(){
    if(this.medico != null && this.medico.idMedico > 0){
      //UPDATE
      this.medicoService
          .modificar(this.medico.idMedico, this.medico)
          .pipe(switchMap( ()=> this.medicoService.listar() ))
          .subscribe(data => {
            this.medicoService.setMedicoChange(data);
            this.medicoService.setMensajeChange('Modificado!');
          });
    }else{
      //INSERT
      this.medicoService
          .registrar(this.medico)
          .pipe(switchMap( ()=> this.medicoService.listar() ))
          .subscribe(data => {
            this.medicoService.setMedicoChange(data);
            this.medicoService.setMensajeChange('Registrado!');
          });
    }

    this.close();
  }

  close(){
    this._dialogRef.close();
  }

}
