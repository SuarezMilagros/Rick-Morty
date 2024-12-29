import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickAndMortyService } from 'src/app/service/rick-and-morty.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  character: any;
  id: string = '';
  episodes: Array<{episode: string, name: string}> = [];

  constructor(private service: RickAndMortyService, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    console.log(this.id)
    const data = await this.service.uniqueCharacter(this.id).toPromise();
    this.character = data;
    
    if (this.character && this.character.episode) {
      for (let episodeUrl of this.character.episode) {
        const episodeData = await this.service.getEpisodeData(episodeUrl).toPromise();
        this.episodes.push({
          episode: episodeData.episode,
          name: episodeData.name
        });
      }
    }
  }
}


