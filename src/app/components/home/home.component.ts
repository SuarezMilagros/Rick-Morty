import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from 'src/app/service/rick-and-morty.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  characters: any[] = [];

  //paginado
  currentPage: number = 1;
  totalPages: number = 0;
  
  constructor(private service: RickAndMortyService){}

 ngOnInit() {

    this.service.getCharacters().subscribe(data => {
        this.characters = data.results;
        console.log(this.characters)
        this.totalPages = data.info.pages;
    });
    
  }
}