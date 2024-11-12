
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
}
