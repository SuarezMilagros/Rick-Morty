import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseUrl = 'http://api-auth.academy.mobydigital.com/api/comment'; // Cambia por el endpoint real

  constructor(private http: HttpClient) {}

  // Obtener comentarios por ID de episodio
  getCommentsByEpisode(episodeId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/episode/${episodeId}`);
  }

  // Crear un nuevo comentario
  addComment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  // Editar un comentario
  editComment(commentId: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${commentId}`, data);
  }

  // Eliminar un comentario
  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${commentId}`);
  }

  // Desactivar comentarios para un episodio
  disableCommentsForEpisode(episodeId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/disable/${episodeId}`, {});
  }
}
