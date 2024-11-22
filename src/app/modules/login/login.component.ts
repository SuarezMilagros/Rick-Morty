import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;


// Defino el formulario reactivo y las validaciones
  constructor(private fb: FormBuilder,private service: AuthService,private router: Router
  ) {
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  signIn() {
    //marca los campos como error cuando lo presiona
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const loginData = this.loginForm.value;
    this.service.login(loginData).subscribe(
      (response) => {
        sessionStorage.setItem('name', response.data.user.name);
        sessionStorage.setItem('isAuthenticated', 'true');
        this.router.navigate(['/home']);
      },
      (error) => {
        if (error.status === 400) {
          if (error.error.header.resultCode === 3) {
            alert("User not found");
          } else if (error.error.header.resultCode === 4) {
            alert("Invalid password");
          } else if (error.error.header.resultCode === 2) {
            alert("is not allowed to be empty");
          }
        } else {
          console.error('Unexpected error:', error);
        }
      }
    );
  }
  get mail() {
    return this.loginForm.get('mail');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onRegister() {
    this.router.navigate(['/register']);
  }
}
