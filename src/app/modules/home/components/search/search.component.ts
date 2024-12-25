import { Component, EventEmitter, Output } from '@angular/core';
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
  searchTerm: any;
  rickAndMortyService: any;
  @Output() characterSearch = new EventEmitter<string>();


  constructor(private service: RickAndMortyService){}

//manejarlo con output
  onSearch(): void {
    this.characterSearch.emit(this.searchQuery);
  }

}


