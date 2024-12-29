import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;


// Defino el formulario reactivo y las validaciones
  constructor(private fb: FormBuilder,private service: AuthService,private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  signIn() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
  
    const loginData = this.loginForm.value;
    console.log(loginData)
    this.service.login(loginData).subscribe(
      (response) => {
        console.log(response)
        //sessionStorage.setItem('token', response.token); // Guardar el token
        //sessionStorage.setItem('user', JSON.stringify(response.user));
        sessionStorage.setItem('isAuthenticated', 'true');
        this.router.navigate(['/home']);
      },
      (error) => {
        alert(error.error.message || 'Error al iniciar sesión.'); // Mostrar mensaje del backend
      }
    );
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

  get mail() {
    return this.loginForm.get('mail');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      console.log('Login Data:', loginData);
      // Lógica para manejar el inicio de sesión
    }
}
}
