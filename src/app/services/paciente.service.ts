import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Paciente } from '../model/paciente';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PacienteService extends GenericService<Paciente> {

  constructor(http:HttpClient) {
    super(http, `${environment.HOST}/pacientes`);
  }


}
