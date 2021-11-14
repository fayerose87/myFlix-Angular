import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://fayes-flix.herokuapp.com/';
const token = localStorage.getItem('token');

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }
  
  // user login 
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // get all movies 
  getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        { Authorization: 'Bearer' + token, }
      )
    }).pipe(
      catchError(this.handleError)
    );
  }

  // get one movie
  getOneMovie(): Observable<any> {
    return this.http.get(apiUrl + 'movies/:title', {
      headers: new HttpHeaders(
        { Authorization: 'Bearer' + token, }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get director
  getDirector(): Observable<any> {
    return this.http.get(apiUrl + 'movies/director/:Name', {
      headers: new HttpHeaders(
        { Authorization: 'Bearer' + token, }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get genre
  getGenre(): Observable<any> {
    return this.http.get(apiUrl + '/movies/genre/:Name', {
      headers: new HttpHeaders(
        { Authorization: 'Bearer' + token, }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    // get user 
    getUser(): Observable<any> {
      return this.http.get(apiUrl + `users/:Username`, {
        headers: new HttpHeaders(
          { Authorization: 'Bearer' + token, }
        )
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }

  // get favorite movies for a user
  getFavoriteMovies(): Observable<any> {
    return this.http.get(apiUrl + `users/:Username/Movies`, {
      headers: new HttpHeaders(
        { Authorization: 'Bearer' + token, }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // add movie to user favorites
  addMovieToFavorites(_id: string): Observable<any> {
    return this.http.post(apiUrl + `/users/:Username/Movies/${_id}`, _id, {
      headers: new HttpHeaders(
        { Authorization: 'Bearer' + token, }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // delete movie from user favorites
  deleteMovieFromFavorites(_id: string): Observable<any> {
    return this.http.get(apiUrl + `users/:Username/Movies/${_id}`, {
      headers: new HttpHeaders(
        { Authorization: 'Bearer' + token, }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // edit user 
  editUser(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + `users/:Username`, userDetails, {
      headers: new HttpHeaders(
        { Authorization: 'Bearer' + token, }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // delete user 
  deleteUser(): Observable<any> {
    return this.http.delete(apiUrl + `users/:Username`, {
      headers: new HttpHeaders(
        { Authorization: 'Bearer' + token, }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Non-typed response extraction
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something went wrong; please try again later.');
  }
}