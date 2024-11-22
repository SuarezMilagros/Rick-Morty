import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
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
      address: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('^[0-9]{4,5}$')]]
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
      this.errorMessages['password'] = 'La contraseña debe tener al menos 8 caracteres.';
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
      const address = {
        street: formValues.address,
        city: formValues.city,
        location: '-',
        country: formValues.state,
        cp: formValues.zip
      };

      const registerData = {
        name: formValues.name,
        mail: formValues.mail,
        password: formValues.password,
        address: address,
        birthday: this.birthday,
        phone: '3865571470'
      };

      this.service.register(registerData).subscribe(
        (response) => {
          // Guardar información en sessionStorage
          sessionStorage.setItem('userMail', response.data.user.mail);
          sessionStorage.setItem('userName', response.data.user.name);
          sessionStorage.setItem('userAddress', JSON.stringify(response.data.user.address));
          
          // Navegar a la página de login
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
    
      );
    } else {
      this.setErrorMessages(); 
    }
  }
}
