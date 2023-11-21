import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Examen } from '../model/examen';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamenService extends GenericService<Examen> {

  private examenChange:Subject<Examen[]> = new Subject<Examen[]>();
  private mensajeChange:Subject<string> = new Subject<string>();

  constructor(http:HttpClient) {
    super(http, `${environment.HOST}/examenes`);
  }

  paginacion(p:number, s:number){
    return this.http.get<any>(`${this.url}/paginacion?page=${p}&size=${s}`);
  }

  getExamenChange(){
    return this.examenChange.asObservable();
  }

  setExamenChange(data:Examen[]){
    this.examenChange.next(data);
  }

  getMensajeChange(){
    return this.mensajeChange.asObservable();
  }

  setMensajeChange(data:string){
    this.mensajeChange.next(data);
  }

}
