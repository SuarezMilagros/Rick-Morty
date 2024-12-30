import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/service/comments.service';
import { RickAndMortyService } from 'src/app/service/rick-and-morty.service';

@Component({
  selector: 'app-detail',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  episode: any;
  characters: any[] = [];
  isFavorite: boolean = false;

  //Comentarios
  comments: any[] = [];
  commentForm: FormGroup;
  editMode: boolean = false;
  editingCommentId: number | null = null;
  commentsDisabled: boolean = false;
  isAdmin: boolean = false; // Esto debería venir del servicio de autenticación
  userId: number = 1; // Id del usuario actual
  placeholderImage: string = 'assets/placeholder-profile.png'; // Imagen predeterminada

  constructor(
    private route: ActivatedRoute,private service: RickAndMortyService, private fb: FormBuilder, private commentService: CommentService
  ) {
    this.commentForm = this.fb.group({
      text: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    //Detalles de personaje que no me sale
    const id = this.route.snapshot.params['id']; 
    console.log('ID obtenido desde la ruta:', id);
    
    this.service.getEpisodeById(id).subscribe(
      (data) => {
        this.episode = data; // Asigna los datos del episodio
        this.characters = data.characters; // Lista de URLs de los personajes
        this.fetchCharacterDetails(); // Carga detalles de personajes
      },
      (error) => {
        console.error('Error al obtener los detalles del episodio:', error);
      }
    );
//comments
    const episodeId = 1; // Cambia por el ID dinámico del episodio
    this.loadComments(episodeId);
  }


//detalles
  fetchCharacterDetails(): void {
    if (this.characters.length > 0) {
      this.characters.forEach((url) => {
        this.service.getEpisodeData(url).subscribe(
          (character) => {
            this.characters.push(character);
          },
          (error) => {
            console.error('Error al cargar detalles del personaje:', error);
          }
        );
      });
    }
  }
  

  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    // Lógica para guardar en favoritos
  }

 //Comentarios

 loadComments(episodeId: number): void {
  this.commentService.getCommentsByEpisode(episodeId).subscribe(
    (comments) => {
      this.comments = comments;
    },
    (error) => {
      console.error('Error loading comments:', error);
    }
  );
}

onSubmit(): void {
  if (this.commentForm.valid) {
    const commentData = {
      text: this.commentForm.value.text,
      episodeId: 1, // Cambia por el ID dinámico del episodio
      userId: this.userId,
    };

    if (this.editMode && this.editingCommentId) {
      // Actualizar un comentario existente
      this.commentService
        .editComment(this.editingCommentId, commentData)
        .subscribe(() => {
          this.loadComments(1); // Recarga comentarios
          this.resetForm();
        });
    } else {
      // Crear un nuevo comentario
      this.commentService.addComment(commentData).subscribe(() => {
        this.loadComments(1); // Recarga comentarios
        this.commentForm.reset();
      });
    }
  }
}

editComment(comment: any): void {
  this.editMode = true;
  this.editingCommentId = comment.id;
  this.commentForm.patchValue({ text: comment.text });
}

deleteComment(commentId: number): void {
  this.commentService.deleteComment(commentId).subscribe(() => {
    this.comments = this.comments.filter((c) => c.id !== commentId);
  });
}

disableComments(): void {
  const episodeId = 1; // Cambia por el ID dinámico
  this.commentService.disableCommentsForEpisode(episodeId).subscribe(() => {
    this.commentsDisabled = true;
  });
}

resetForm(): void {
  this.editMode = false;
  this.editingCommentId = null;
  this.commentForm.reset();
}

canEdit(comment: any): boolean {
  return this.userId === comment.author.id || this.isAdmin;

}

}
