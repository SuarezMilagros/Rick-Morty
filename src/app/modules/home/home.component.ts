import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from 'src/app/service/rick-and-morty.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  characters: any[] = [];
  currentPage: number = 1;
  isLoggedIn: boolean = true
  receiveCharacter: string = ""



  constructor(private service: RickAndMortyService) {}

  ngOnInit() {
    this.loadCharacters(this.currentPage); // Carga inicial
  }

  loadCharacters(pages: number) {
    this.service.pagedCharacter(pages).subscribe(data => {
      this.characters = data.results;
      this.currentPage = pages;
    });
  }

  onPageChange(page: number) {
    this.loadCharacters(page); // Cargar personajes para la nueva página
  }


   receivedCharacter(mensaje: string) {
      this.receiveCharacter = mensaje;
      console.log('desde el padre: '+ this.receiveCharacter)
      if (this.receiveCharacter.trim()) { // Verifica si la consulta no está vacía
        this.service.searchCharacters(this.receiveCharacter).subscribe(
          (response: { results: any[]; }) => {
            this.characters = response.results; // Almacena los resultados en la propiedad 'characters'
          },
          (error: any) => {
            console.error('Error al obtener los personajes', error);
            this.characters = []; // Si hay un error, limpiamos los resultados
          }
        );
      }else{
        this.loadCharacters(this.currentPage);
      }
    }
    
}