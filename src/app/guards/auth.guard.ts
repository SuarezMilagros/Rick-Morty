import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Verifica si el usuario está autenticado
    const isAuthenticated = sessionStorage.getItem('isAuthenticated'); // Puedes cambiar esto según tu lógica

    if (isAuthenticated) {
      return true; // Permitir el acceso
    } else {
      // Redirigir al login si no está autenticado
      this.router.navigate(['/login']);
      return false; // Denegar el acceso
    }
  }
}