import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://api-auth.academy.mobydigital.com/api/user'
  isAuthenticated: any;

  constructor(private http: HttpClient, private router: Router, ) { }

  login(login:Login): Observable<any>{
    return this.http.post(this.url + '/login', login);
  }

}


