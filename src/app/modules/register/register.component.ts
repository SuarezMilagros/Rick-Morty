import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { SharedModule } from "../../shared/shared.module";
import { HeaderComponent } from "../../shared/components/header/header.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],

})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessages: { [key: string]: string } = {};
  birthday: any;

  constructor(private formBuilder: FormBuilder,private service: AuthService,private router: Router) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', [Validators.required]],
    }, { validator: this.passwordMatchValidator });

  }

  ngOnInit(): void {
    this.registerForm.valueChanges.subscribe(() => this.setErrorMessages());
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('repeatPassword')?.value
      ? null : { mismatch: true };
  }

  setErrorMessages() {
    const controls = this.registerForm.controls;
    this.errorMessages = {}; 

    if (controls['name'].hasError('required')) {
      this.errorMessages['name'] = 'El nombre es obligatorio.';
    } else if (controls['name'].hasError('minlength')) {
      this.errorMessages['name'] = 'El nombre debe tener al menos 3 caracteres.';
    }

    if (controls['mail'].hasError('required')) {
      this.errorMessages['mail'] = 'El correo es obligatorio.';
    } else if (controls['mail'].hasError('email')) {
      this.errorMessages['mail'] = 'Debe ingresar un correo válido.';
    }

    if (controls['password'].hasError('required')) {
      this.errorMessages['password'] = 'La contraseña es obligatoria.';
    } else if (controls['password'].hasError('minlength')) {
      this.errorMessages['password'] = 'La contraseña debe tener al menos 6 caracteres.';
    }

    if (controls['repeatPassword'].hasError('required')) {
      this.errorMessages['repeatPassword'] = 'Debe repetir la contraseña.';
    } else if (this.registerForm.hasError('mismatch')) {
      this.errorMessages['repeatPassword'] = 'Las contraseñas no coinciden.';
    }
  }

  signUp() {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;
  
      this.service.register(formValues).subscribe(
        (response) => {
          alert('Registro exitoso. Ahora puedes iniciar sesión.');
          this.router.navigate(['/login']);
        },
        (error) => {
          alert(error.error.message || 'Error al registrar usuario.');
        }
      );
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
  
  // Método para crear la dirección
  private createAddress(formValues: any): any {
    return {
      street: formValues.address,
      city: formValues.city,
      location: '-',
      country: formValues.state,
      cp: formValues.zip
    };
  }
  
  // Método para crear los datos de registro
  private createRegisterData(formValues: any, address: any): any {
    return {
      name: formValues.name,
      mail: formValues.mail,
      password: formValues.password,
      address: address,
      birthday: this.birthday,
      phone: '3865571470' 
    };
  }
  
  // Método para registrar al usuario
  private registerUser(registerData: any): void {
    this.service.register(registerData).subscribe(
      (response) => {
        this.handleSuccessResponse(response);
      },
      (error) => {
        this.handleErrorResponse(error);
      }
    );
  }
  
  // Manejo de la respuesta exitosa
  private handleSuccessResponse(response: any): void {
    sessionStorage.setItem('userMail', response.data.user.mail);
    sessionStorage.setItem('userName', response.data.user.name);
    sessionStorage.setItem('userAddress', JSON.stringify(response.data.user.address));
  
    this.router.navigate(['/login']);
  }
  
  // Manejo de errores
  private handleErrorResponse(error: any): void {
    if (error.status !== 200) {
      const resultCode = error.error.header.resultCode;
  
      switch (resultCode) {
        case 1:
          alert("Mail already registered");
          break;
        case 2:
          alert("Field is not allowed to be empty");
          break;
        default:
          alert("An unexpected error occurred");
      }
    }
  }
  
  
}
