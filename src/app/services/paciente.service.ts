import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Paciente } from '../model/paciente';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService extends GenericService<Paciente> {

  private pacienteChange:Subject<Paciente[]> = new Subject<Paciente[]>();
  private mensajeChange:Subject<string> = new Subject<string>();

  constructor(http:HttpClient) {
    super(http, `${environment.HOST}/pacientes`);
  }

  paginacion(p:number, s:number){
    return this.http.get<any>(`${this.url}/paginacion?page=${p}&size=${s}`);
  }

  getPacienteChange(){
    return this.pacienteChange.asObservable();
  }

  setPacienteChange(data:Paciente[]){
    this.pacienteChange.next(data);
  }

  getMensajeChange(){
    return this.mensajeChange.asObservable();
  }

  setMensajeChange(data:string){
    this.mensajeChange.next(data);
  }

}
