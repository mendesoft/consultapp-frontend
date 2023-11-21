import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Especialidad } from '../model/especialidad';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService extends GenericService<Especialidad> {

  private especialidadChange:Subject<Especialidad[]> = new Subject<Especialidad[]>();
  private mensajeChange:Subject<string> = new Subject<string>();

  constructor(http:HttpClient) {
    super(http, `${environment.HOST}/especialidades`);
  }

  paginacion(p:number, s:number){
    return this.http.get<any>(`${this.url}/paginacion?page=${p}&size=${s}`);
  }

  getEspecialidadChange(){
    return this.especialidadChange.asObservable();
  }

  setEspecialidadChange(data:Especialidad[]){
    this.especialidadChange.next(data);
  }

  getMensajeChange(){
    return this.mensajeChange.asObservable();
  }

  setMensajeChange(data:string){
    this.mensajeChange.next(data);
  }

}
