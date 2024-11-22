import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RickAndMortyService } from 'src/app/service/rick-and-morty.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchQuery: string = ''; // Variable para almacenar la consulta de búsqueda
  characters: any[] = []; // Resultados de la búsqueda
  searchTerm: any;
  rickAndMortyService: any;

  constructor(private service: RickAndMortyService){}


  onSearch(): void {
    if (this.searchQuery.trim()) { // Verifica si la consulta no está vacía
      this.service.searchCharacters(this.searchQuery).subscribe(
        (response: { results: any[]; }) => {
          this.characters = response.results; // Almacena los resultados en la propiedad 'characters'
        },
        (error: any) => {
          console.error('Error al obtener los personajes', error);
          this.characters = []; // Si hay un error, limpiamos los resultados
        }
      );
    }
  }

}

