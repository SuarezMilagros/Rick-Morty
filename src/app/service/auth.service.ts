import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { Register } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://api-auth.academy.mobydigital.com/api/user'
  isAuthenticated: any;

  constructor(private http: HttpClient, private router: Router, ) { }

  login(login:Login): Observable<any>{
    return this.http.post(this.url + '/login', login);
  }

  register(register:Register): Observable<any>{
    return this.http.post(this.url + '/register', register)
  }

}


