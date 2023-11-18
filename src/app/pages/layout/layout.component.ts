import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MaterialModule } from 'src/app/material/material/material.module';
import { Menu } from 'src/app/model/menu';
import { LoginService } from 'src/app/services/login.service';
import { MenuService } from 'src/app/services/menu.service';
import { environment } from 'src/environments/environment.development';
@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [MaterialModule, RouterOutlet, RouterLink, RouterLinkActive, NgIf, NgFor],
})
export class LayoutComponent implements OnInit {
  menus: Menu[];
  menus2 =
    [
  {
      "idMenu" : 1,
    "icono" : "home",
    "nombre" : "Inicio",
    "url" : "/dashboard"
  }
  ]

  constructor(
    private loginService: LoginService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    // this.menuService.getMenuChange().subscribe((data) => {
    //   this.menus = data;
    // });
    this.cargarMenu();
  }

   helper = new JwtHelperService();
   token = sessionStorage.getItem(environment.TOKEN_NAME);
   decodedToken = this.helper.decodeToken(this.token);
   username = this.decodedToken.sub;


  cargarMenu(){
    this.menuService.getMenusByUser(this.username).subscribe(data => this.menus = data);
  }

  logout() {
    this.loginService.logout();
  }
}
