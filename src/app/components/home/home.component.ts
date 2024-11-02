import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from 'src/app/service/rick-and-morty.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  characters: any[] = [];

  constructor(private service: RickAndMortyService){}

  async ngOnInit(): Promise<void> {
    const data = await this.service.getCharacters().toPromise();
    this.characters = data.results;
    /*this.service.getCharacters().subscribe(data => {
        this.characters = data.results;
    });*/
  }
}