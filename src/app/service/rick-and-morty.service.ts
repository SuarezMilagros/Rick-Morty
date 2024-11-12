import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private url = 'https://rickandmortyapi.com/api/character'

  constructor(private http: HttpClient) { }

  getCharacters():Observable<any> {
    return this.http.get<any>(this.url);
  } 

  uniqueCharacter(id:string): Observable<any>{
    return this.http.get<any>(this.url + '/' + id)
  }

  pagedCharacter(page: number = 1): Observable<any> {
    console.log(this.url + '/' + page);
    return this.http.get<any>(this.url + '/?page='+page);
  }
  
}
