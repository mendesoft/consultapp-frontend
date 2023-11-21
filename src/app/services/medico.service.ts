import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Medico } from '../model/medico';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicoService extends GenericService<Medico> {

  private medicoChange:Subject<Medico[]> = new Subject<Medico[]>();
  private mensajeChange:Subject<string> = new Subject<string>();

  constructor(http:HttpClient) {
    super(http, `${environment.HOST}/medicos`);
  }

  paginacion(p:number, s:number){
    return this.http.get<any>(`${this.url}/paginacion?page=${p}&size=${s}`);
  }

  getMedicoChange(){
    return this.medicoChange.asObservable();
  }

  setMedicoChange(data:Medico[]){
    this.medicoChange.next(data);
  }

  getMensajeChange(){
    return this.mensajeChange.asObservable();
  }

  setMensajeChange(data:string){
    this.mensajeChange.next(data);
  }

}
