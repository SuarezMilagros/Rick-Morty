import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/adress.model';
import { Register } from 'src/app/models/register.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  mail: string = '';
  password: string = '';
  street: string = '';
  city: string = '';
  location: string = '';
  country: string = '';
  cp: string = '';
  address: Address | undefined;
  birthday!: Date; 
  phone: string = '';

  private register: Register | undefined;


  constructor(private service: AuthService,private router: Router) {}

  signUp(){
  this.address = {street: this.street, city: this.city, location: '-', country: this.country, cp: this.cp};
  this.birthday = this.birthday
  this.register = {name: this.name, mail: this.mail, password: this.password, address:this.address, birthday: this.birthday, phone: '3865571470'}

   const response =  this.service.register(this.register). subscribe(
    (response) => {
      console.log(response)
      this.router.navigate(['/login']);
    },
    (error) => {
      if (error.status != 200) {
        
        if(error.error.header.resultCode===1){
          alert("Mail already registered")
        }

        if(error.error.header.resultCode===2){
          alert("is not allowed to be empty")
         }
      }
    }
   )

  }

}
