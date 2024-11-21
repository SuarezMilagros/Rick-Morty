import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Login } from "src/app/models/login.model"
import { ConstantPool } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  mail: string = '';
  password: string = ''
  private login: Login | undefined;
  constructor(private service: AuthService,private router: Router) {}


  signIn(){
    this.login = {mail: this.mail, password: this.password}
    const response = this.service.login(this.login).subscribe(
      (response) => {
        this.router.navigate(['/home']);
      },
      (error) => {
        if (error.status === 400) {
          
          if(error.error.header.resultCode===3){
            alert("User not found")
    }

          if(error.error.header.resultCode===4){
            alert("Invalid password")
    }

          if(error.error.header.resultCode===2){
            alert("is not allowed to be empty")
    }
        } else {
          console.error('Error inesperado:', error);
        }
      }
    );
  }
}

