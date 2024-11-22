import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name: string = ''
  @Input() isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.name = sessionStorage.getItem('name') || ""
  }
  loginAsGuest() {
    // Cambia el estado de inicio de sesión a verdadero
    this.isLoggedIn = true;
  }

  logout() {
    // Cambia el estado de inicio de sesión a falso
    this.isLoggedIn = false;
  }


}
