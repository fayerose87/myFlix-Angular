import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  genres: any[] = [];
  favorites: any[] = [];
  
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
    ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: { name, description },
      width: '280px'
    });
  }

  openDirectorDialog(name: string, bio: string, birthyear: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: { name, bio, birthyear },
      width: '280px'
    });
  }

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: { title, description },
      width: '280px'
    });
  }

  addMovieToFavorites(id: string, Title: string): void {
    this.fetchApiData.addMovieToFavorites(id).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been added to favorites`, 'OK', {
        duration: 2000,
      });
      return this.getUserFavs();
    });
  }

  deleteMovieFromFavorites(id: string, Title: string): void {
    this.fetchApiData.deleteMovieFromFavorites(id).subscribe((res: any) => {
      this.snackBar.open(`${Title} has been removed from favorites`, 'OK', {
        duration: 3000,
      })
      setTimeout(function () {
      }, 3500);
      return this.getUserFavs();
    })
   }

   getUserFavs(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      return this.favorites;
    });
  }

  setFavoriteStatus(id: any): any {
    if (this.favorites.includes(id)) {
      return true;
    } else {
      return false;
    }
  }


}