import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteEpisodesService {
  private favoriteKey = 'favoriteEpisodes';

  constructor() {}

  getFavorites(): any[] {
    const favorites = localStorage.getItem(this.favoriteKey);
    return favorites ? JSON.parse(favorites) : [];
  }

  addFavorite(episode: any): void {
    const favorites = this.getFavorites();
    if (!favorites.find((fav) => fav.id === episode.id)) {
      favorites.push(episode);
      localStorage.setItem(this.favoriteKey, JSON.stringify(favorites));
    }
  }

  removeFavorite(episodeId: number): void {
    const favorites = this.getFavorites().filter((fav) => fav.id !== episodeId);
    localStorage.setItem(this.favoriteKey, JSON.stringify(favorites));
  }

  isFavorite(episodeId: number): boolean {
    return !!this.getFavorites().find((fav) => fav.id === episodeId);
  }
}
