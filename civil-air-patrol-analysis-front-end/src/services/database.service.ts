// AngularIO libraries.
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

// Custom libraries.
import { Analysis } from '../models/analysis';
import { Class } from '../models/class';
import { Data_Set } from '../models/data_set';
import { Image_Set } from '../models/image_set';
import { User } from '../models/user';

// Constant httpOptions object that appends a header to each http request made.
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

/*
 *
 * The DatabaseService that makes http requests from the 
 * front-end application to the back-end API.
 * 
 */

@Injectable()
export class DatabaseService {

  //  The urls to access the REST service.
  private api_url: string;
  private photos_url: string = 'photos/';
  private random_photo_url: string = 'photos/randomphoto';
  private analysis_url: string = 'analysis/';
  private class_url: string = 'class/';
  private data_set_url: string = 'data_sets/';
  private image_set_url: string = 'image_sets/';
  private user_url: string = 'user/';

  /*
   *
   * The DatabaseService constructor.
   * 
   * @param {http:HttpClient}  The HttpClient used to make http requests to the server.
   * 
   */

  constructor(
    private http: HttpClient
  ) {
    this.api_url = environment.apiUrl;
   }

  /*
   *
   * Returns the base url for the REST calls.
   * 
   * @return {string}   The base REST url.
   *                      
   */
  
  get_api_url(): string {
    return this.api_url;
  }

  /*
   *
   * Returns the file url extention that will render the photos the page is requesting.
   * 
   * @return {string}   The file url string.
   *                      
   */

  get_photos_url(): string {
    return this.photos_url;
  }

  /*
   *
   * Sends a http POST request to save a analysis to database.
   * 
   * @param {analysis:Analysis}       The analysis object to save to the database.
   * 
   * @return {Observable<Analysis>}   The server response with the analysis
   *                                  object information on whether it was 
   *                                  saved or not.
   * 
   */

  create_analysis(analysis: Analysis): Observable<Analysis> {
    return this.http.post<Analysis>(this.api_url + this.analysis_url, analysis, 
      httpOptions).pipe(catchError(this.handle_error<Analysis>('create_analysis')));
  }

  /*
   *
   * Sends a http POST request to save user info to database.
   * 
   * @param {analysis:Analysis}       The user object to save to the database.
   * 
   * @return {Observable<Analysis>}   The server response with the user object
   *                                  information on whether it was saved or not.
   * 
   */

  create_user(user: User): Observable<Analysis> {
    return this.http.post<Analysis>(this.api_url + this.user_url, user, 
      httpOptions).pipe(catchError(this.handle_error<Analysis>('create_user')));
  }

  /*
   *
   * Sends a http GET request to retrieve all of the analysis.
   * 
   * @return {Observable<Analysis[]>}    The server response with an array of
   *                                     all of the analysis in the database.
   * 
   */

  get_all_analysises(): Observable<Analysis[]> {
    return this.http.get<Analysis[]>(this.api_url + this.analysis_url)
      .pipe(catchError(this.handle_error('get_all_analysises', [])));
  }

  /*
   *
   * Sends a http GET request to retrieve all of the classifications.
   * 
   * @return {Observable<Class[]>}    The server response with an array of all
   *                                  of the classifications in the database.
   * 
   */

  get_all_classes(): Observable<Class[]> {
    return this.http.get<Class[]>(this.api_url + this.class_url)
      .pipe(catchError(this.handle_error('get_all_classes', [])));
  }

  /*
   *
   * Sends a http GET request to retrieve all of the data set collections.
   * 
   * @return {Observable<Class[]>}    The server response with an array of all
   *                                  of the data set collections in the database.
   * 
   */

  get_all_data_sets(): Observable<Data_Set[]> {
    return this.http.get<Data_Set[]>(this.api_url + this.data_set_url)
      .pipe(catchError(this.handle_error('get_all_img_col', [])));
  }

  /*
   *
   * Sends a http GET request to retrieve a random image set.
   * 
   * @param {data_set:string}        The data set to get a random image set from.
   * 
   * @return {Observable<Class[]>}   The server response with a random image set.
   *                                  
   * 
   */

  get_rnd_img_set_col(data_set: string): Observable<Image_Set[]> {
    return this.http.get<Image_Set[]>(this.api_url + this.image_set_url + data_set)
      .pipe(catchError(this.handle_error('get_rnd_img_set_col', [])));
  }

  /*
   *
   * Sends a http GET request to retrieve a specific analysis based on id.
   * 
   * @param {id:number}               The id of the analysis to retrieve.
   * 
   * @return {Observable<Analysis>}   The server response with the analysis
   *                                  information from the database.
   * 
   */

  get_analysis(id: number): Observable<Analysis> {
    const url = this.api_url + this.analysis_url + id;
    return this.http.get<Analysis>(url).pipe(catchError(
      this.handle_error<Analysis>(`get_analysis id=${id}`)));
  }

  /*
   *
   * Handles the error of the http requests displaying an
   * error in the console.
   * 
   * @param {operation:string}    The operation string that was used for the
   *                              http request.
   * @param {result:any}          Any type of observable object returned from 
   *                              the http request.
   * 
   * @return {any}                Any type of observable object returned.
   * 
   */

  private handle_error<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      console.error(error);

      return of(result as T);
    };
  }
}
