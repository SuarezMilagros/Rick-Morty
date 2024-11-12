import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from 'src/app/service/rick-and-morty.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit{
//No se si esto lo declaro aca o en home
pageInfo: any = {}; //totla de paginas
currentPage: number = 1; //pagina actual

constructor(private service: RickAndMortyService){} //No se si es necesario llamar esto aca

ngOnInit(): void {
  
}


}
