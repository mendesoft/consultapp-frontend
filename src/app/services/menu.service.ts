import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Menu } from '../model/menu';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends GenericService<Menu>{

  private menuChange = new Subject<Menu[]>();

  constructor(http:HttpClient) {
    super(http, `${environment.HOST}/menus`);
  }

  getMenusByUsername(username:string) {
      return this.http.post<Menu[]>(`${this.url}/user`, username);
  }

  getMenuChange(){
    return this.menuChange.asObservable();
  }

  setMenuChange(menus:Menu[]){
    this.menuChange.next(menus);
  }

}
