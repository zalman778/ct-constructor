import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IResponse} from '../model/response.model';
import {Observable} from 'rxjs';

/*
  Сервис взаимодействия с сервером авторизации.
 */
@Injectable()
export class AuthenticationService {
  API_HOST = 'http://localhost:8081';

  constructor(private httpClient: HttpClient) { }

  login(loginObject: Object) {

    let reqUrl = this.API_HOST + '/api/userAuth';
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.httpClient
      .post(reqUrl, loginObject, {headers: headers})
      // .pipe(first()) ?!
      .map((data: IResponse) => {
        return data;
      })
      .catch(this.handleError);
  }

  logout() {
    // remove user from local storage to log user out
    //localStorage.removeItem('currentUser');
  }

  //error handling
  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}
