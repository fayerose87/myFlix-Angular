import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FetchApiDataService } from "../fetch-api-data.service";
import { GenreViewComponent } from "../genre-view/genre-view.component";
import { DirectorViewComponent } from "../director-view/director-view.component";
import { SynopsisViewComponent } from "../synopsis-view/synopsis-view.component";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

// Global variables
const user = localStorage.getItem("user");

@Component({
  selector: "app-movie-card",
  templateUrl: "./movie-card.component.html",
  styleUrls: ["./movie-card.component.scss"],
})
export class MovieCardComponent implements OnInit {
  user: any[] = [];
  movies: any[] = [];
  favorites: any[] = [];
  favs: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUsersFavs();
  }

  /**
   * Retrieves all the movies from the database
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * Opens a dialog containing info about the genre
   * @param name the name of the genre
   * @param description the description of the genre
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: { name, description },
      width: "400px",
    });
  }

  /**
   * Opens a dialog containing info about the director
   * @param name the name of the director
   * @param bio the bio of the director
   * @param birth bithdate of the director
   * @param birthplace birthplace of the director
   * @param directorImage image of the director
   */
  openDirector(
    name: string,
    bio: string,
    birth: string,
    birthplace: Date,
    directorImage: any
  ): void {
    this.dialog.open(DirectorViewComponent, {
      data: { name, bio, birth, birthplace, directorImage },
      width: "400px",
    });
  }

  /**
   * Opens a dialog containing info about the movie
   * @param title the title of the movie
   * @param description the description of the movie
   */
  openSynopsis(title: string, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: { title, description },
      width: "400px",
    });
  }

  /**
   * Gets users favorite movies
   */
  getUsersFavs(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favs = resp.FavoriteMovies;
      return this.favs;
    });
  }

  /**
   * Adds a movie to the user's list of favorites
   * @param id the id of the movie
   * @param title the title of the movie
   */
  addFavoriteMovie(id: string, title: string): void {
    this.fetchApiData.addFavorite(id).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been added to your favorites.`, "OK", {
        duration: 3000,
      });
      return this.getUsersFavs();
    });
  }

  /**
   * Removes a movie from the user's list of favorites
   * @param id the id of the movie
   * @param title the title of the movie
   */
  removeFavoriteMovie(id: string, title: string): void {
    this.fetchApiData.removeFavorite(id).subscribe((resp: any) => {
      this.snackBar.open(
        `${title} has been removed from yourfavorties.`,
        "OK",
        {
          duration: 3000,
        }
      );
    });
    return this.getUsersFavs();
  }

  /**
   * Toggles favorite
   */
  setFavStatus(id: any): any {
    if (this.favs.includes(id)) {
      return true;
    } else {
      return false;
    }
  }
}
