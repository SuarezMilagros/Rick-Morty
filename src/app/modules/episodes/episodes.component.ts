import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RickAndMortyService } from 'src/app/service/rick-and-morty.service';
import { FavoriteEpisodesService } from 'src/app/service/favorite-episodes.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css'],
})
export class EpisodesComponent implements OnInit {
  episodes: any[] = [];
  filteredEpisodes: any[] = [];
  searchQuery: string = '';
  info: any = {};
  currentPage: number = 1;
  pages: number[] = [];

  constructor(
    private service: RickAndMortyService,
    private router: Router,
    private favoriteService: FavoriteEpisodesService
  ) {}

  ngOnInit(): void {
    this.fetchEpisodes(this.currentPage);
  }

  fetchEpisodes(page: number): void {
    this.service.getEpisodes(page).subscribe((data: any) => {
      this.episodes = data.results.map((episode: any) => ({
        ...episode,
        isFavorite: this.favoriteService.isFavorite(episode.id),
      }));
      this.filteredEpisodes = [...this.episodes];
      this.info = data.info;
      this.pages = Array.from({ length: data.info.pages }, (_, i) => i + 1);
    });
  }

  toggleFavorite(episode: any): void {
    episode.isFavorite = !episode.isFavorite;
    if (episode.isFavorite) {
      this.favoriteService.addFavorite(episode);
    } else {
      this.favoriteService.removeFavorite(episode.id);
    }
  }

  searchEpisodes(): void {
    this.filteredEpisodes = this.episodes.filter((episode) =>
      episode.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  changePage(action: string | number): void {
    if (action === 'prev' && this.info.prev) {
      this.currentPage--;
    } else if (action === 'next' && this.info.next) {
      this.currentPage++;
    } else if (typeof action === 'number') {
      this.currentPage = action;
    }
    this.fetchEpisodes(this.currentPage);
  }

  openDetails(id:string){
    this.router.navigate(['/details',id]);
  }
}
  
