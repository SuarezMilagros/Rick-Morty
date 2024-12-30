import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  name: string = '';
  @Input() isLoggedIn: boolean = false;

  constructor(private router: Router){}

  ngOnInit(): void {
    this.name = sessionStorage.getItem('name') || "";
    this.isLoggedIn = sessionStorage.getItem('isAuthenticated') === 'true';
  }

  loginAsGuest() {
    this.isLoggedIn = true;
    this.name = 'Guest';
    sessionStorage.setItem('isAuthenticated', 'true');
    sessionStorage.setItem('name', 'Guest');
  }

  openLogoutModal() {
    const logoutModalElement = document.getElementById('logoutModal') as HTMLElement;
    const logoutModal = new bootstrap.Modal(logoutModalElement);
    logoutModal.show();
  }

  confirmLogout() {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('name');
    this.isLoggedIn = false;
    window.location.href = '/login'; // Redirige al usuario a la página de login
  }

  openProfile(){
    this.router.navigate(['/profile']);
  }

  openEpisode(){
    this.router.navigate(['/episodes']);
  }


}