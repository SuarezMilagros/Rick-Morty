import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private url = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  getCharacters():Observable<any> {
    return this.http.get<any>(this.url);
  } 

  uniqueCharacter(id:string): Observable<any>{
    return this.http.get<any>(this.url + '/' + id)
  }

  pagedCharacter(page: number): Observable<any> {
    console.log(this.url + '/' + page);
    return this.http.get<any>(this.url + '/?page='+page);
  }

  getEpisodeData(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  // Método para buscar personajes por nombre
  searchCharacters(query: string): Observable<any> {
    const params = new HttpParams().set('name', query); // Usamos 'name' para buscar personajes por nombre
    console.log(params)
    return this.http.get<any>(this.url, { params });
  }
  
  getEpisodes(page: number): Observable<any> {
    return this.http.get<any>(`https://rickandmortyapi.com/api/episode?page=${page}`);
  }

  getEpisodeById(id: number): Observable<any> {
    return this.http.get(`https://rickandmortyapi.com/api/episode/${id}`);
  }
  
  
}
