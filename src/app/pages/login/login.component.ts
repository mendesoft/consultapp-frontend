import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from 'src/app/material/material/material.module';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment.development';

import '../../../assets/login-animation.js'; //animacion

@Component({
  selector: 'app-login',
  standalone:true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [MaterialModule, FormsModule, RouterLink, NgIf]

})
export class LoginComponent {

  username:string;
  password:string;
  message:string;
  error:string;
constructor(
  private loginService:LoginService,
  private router:Router
){}

login(){
  this.loginService.login(this.username, this.password).subscribe(data => {
      sessionStorage.setItem(environment.TOKEN_NAME,data.jwtToken);
      this.router.navigate(['pages/dashboard']);
  })
}

ngAfterViewChecked(): void {
  //Called after every check of the component's view. Applies to components only.
  //Add 'implements AfterViewChecked' to the class.
  (window as any).initialize()
}


}
