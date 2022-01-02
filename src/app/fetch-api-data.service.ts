import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";

//Declaring the api url that will provide data for the client app
const apiUrl = "https://fayes-flix.herokuapp.com/";
//const token = localStorage.getItem('token');

@Injectable({
  providedIn: "root",
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  /**
   * User Registration
   * @param userDetails Username, Password, Email, Birthday
   * @returns endpoint for user registration
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + "users", userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * User Login
   * @param userDetails Username, Password
   * @returns returns endpoint for login
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + "login", userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get all movies
   * @returns endpoint to movie list and bearer token
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + "movies", {
        headers: new HttpHeaders({ Authorization: "Bearer " + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get one movie
   * @param title of movie
   * @returns endpoint for choosen movie and bearer token
   */
  getMovie(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + "movies/:title", {
        headers: new HttpHeaders({ Authorization: "Bearer " + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get director
   * @param name of director
   * @returns endpoint for director and bearer token
   */
  getDirector(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + "movies/director/:Name", {
        headers: new HttpHeaders({ Authorization: "Bearer " + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get genre
   * @params movie genre name
   * @returns endpoint for genre and bearer token
   */
  getGenre(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + "/movies/genre/:Name", {
        headers: new HttpHeaders({ Authorization: "Bearer " + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get user
   * @params username
   * @returns endpoint for genre and bearer token
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return this.http
      .get(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Get favorite movies for user
   * @params username
   * @returns endpoint for user's favorite movies and bearer token
   */
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return this.http
      .get(apiUrl + `users/${user}/Movies`, {
        headers: new HttpHeaders({ Authorization: "Bearer " + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Add a movie to favorites list
   * @param id of movie
   * @param username
   * @returns endpoint for adding movie and bearer token
   */
  addFavorite(id: string): Observable<any> {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    return this.http
      .post(apiUrl + `users/${user}/movies/${id}`, id, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Delete a movie from favorites list
   * @param id  of movie
   * @param username
   * @returns endpoint for deleting favorite movie 
   */
  removeFavorite(id: string): Observable<any> {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    return this.http
      .delete(apiUrl + `users/${user}/movies/${id}`, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Edit user
   * @param userDetails Username, Password, Email, Birthday
   * @param username
   * @returns updates for user and bearer token
   */
  editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return this.http
      .put(apiUrl + `users/${user}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Delete User
   * @param username
   * @returns endpoint for deleting user and bearer token
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return this.http
      .delete(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({ Authorization: "Bearer " + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

    // handle error function
    private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error("Some error occurred:", error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError("Something went wrong; please try again later.");
  }

  // extract non-typed response 
  extractResponseData(res: any | object): any {
    const body = res;
    return body || {};
  }
}
