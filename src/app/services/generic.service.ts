import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {

  constructor(
    protected http:HttpClient,
    @Inject("url") protected url:string
  ) { }


  listar(){
    return this.http.get<T[]>(this.url);
  }

  listarPorId(id: number){
    return this.http.get<T>(`${this.url}/${id}`);
  }

  registrar(t: T){
    return this.http.post(this.url, t);
  }

  modificar(id:number, t: T){
    return this.http.put(`${this.url}/${id}`, t);
  }

  eliminarPorId(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

}
