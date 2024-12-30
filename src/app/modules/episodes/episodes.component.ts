import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RickAndMortyService } from 'src/app/service/rick-and-morty.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent implements OnInit {
  episodes: any[] = [];
  filteredEpisodes: any[] = [];
  searchQuery: string = '';
  info: any = {};
  currentPage: number = 1;
  pages: number[] = [];
episode: any;

  constructor(private service: RickAndMortyService, private router: Router) {}

  ngOnInit(): void {
    this.fetchEpisodes(this.currentPage);
    
  }

  fetchEpisodes(page: number): void {
    this.service.getEpisodes(page).subscribe((data: any) => {
      this.episodes = data.results;
      this.filteredEpisodes = data.results;
      this.info = data.info;
      this.pages = Array.from({ length: data.info.pages }, (_, i) => i + 1);
    });
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

  toggleFavorite(episode: any): void {
    episode.isFavorite = !episode.isFavorite;
    // Lógica para guardar en favoritos
  }

  openDetails(id:string){
    this.router.navigate(['/details',id]);
  }

}
  
