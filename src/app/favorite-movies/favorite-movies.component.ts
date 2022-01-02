import { Component, Input, OnInit } from "@angular/core";
import { FetchApiDataService } from "../fetch-api-data.service";
import { GenreViewComponent } from "../genre-view/genre-view.component";
import { DirectorViewComponent } from "../director-view/director-view.component";
import { SynopsisViewComponent } from "../synopsis-view/synopsis-view.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

const username = localStorage.getItem("user");

@Component({
  selector: "app-favorite-movies",
  templateUrl: "./favorite-movies.component.html",
  styleUrls: ["./favorite-movies.component.scss"],
})
export class FavoriteMoviesComponent implements OnInit {
  user: any = {};
  favorites: any = [];
  movies: any[] = [];
  favs: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUsersFavs();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.filterFavorites();
    });
  }

  filterFavorites(): void {
    this.movies.forEach((movie: any) => {
      if (this.favs.includes(movie._id)) {
        this.favorites.push(movie);
      }
    });
    return this.favorites;
  }

  getUsersFavs(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favs = resp.FavoriteMovies;
      console.log(this.favs, "favs");
      this.filterFavorites();
      return this.favs;
    });
  }

  addFavoriteMovie(id: string, title: string): void {
    this.fetchApiData.addFavorite(id).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been added to your favorites.`, "OK", {
        duration: 3000,
      });
      return this.getUsersFavs();
    });
  }

  removeFavoriteMovie(id: string, title: string): void {
    this.fetchApiData.removeFavorite(id).subscribe((resp: any) => {
      this.snackBar.open(
        `${title} has been removed from your favorites.`,
        "OK",
        {
          duration: 3000,
        }
      );
      setTimeout(function () {
        window.location.reload();
      }, 3000);
    });
    return this.getUsersFavs();
  }

  openGenre(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: { name, description },
      width: "500px",
    });
  }

  openDirector(
    name: string,
    bio: string,
    birth: string,
    birthplace: Date,
    directorImage: any
  ): void {
    this.dialog.open(DirectorViewComponent, {
      data: { name, bio, birth, birthplace, directorImage },
      width: "500px",
    });
  }

  openSynopsis(title: string, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: { title, description },
      width: "500px",
    });
  }

  setFavStatus(id: any): any {
    if (this.favs.includes(id)) {
      return true;
    } else {
      return false;
    }
  }
}
