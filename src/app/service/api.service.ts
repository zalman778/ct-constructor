import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';

import { IResponse} from '../model/response.model';
import 'rxjs/add/operator/map';
import 'rxjs-compat/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_HOST = 'http://localhost:8080';
  API_LIST_URL = this.API_HOST+'/api/objects/';
  API_FORM_URL = this.API_HOST+'/api/form/';
  API_TITLE_URL = this.API_HOST+'/api/title/';
  API_URL = this.API_HOST+'/api/object/';


  constructor(private  httpClient: HttpClient) {}


  //get full entity list
  getFullEntityList(): Observable<Object> {
    return this.httpClient.get(this.API_HOST+'/api/list').pipe(map(data => {
      let objectList = data;
      return objectList;
    }));
  }



  getObjectsList(entityName: string): Observable<Object> {
    return this.httpClient.get(this.API_LIST_URL + entityName).pipe(map(data => {
      let objectList = data;
      return objectList;
    }));
  }

  getObjectById(entityName: string, objectId: number): Observable<Object> {
    return this.httpClient.get(this.API_URL + entityName+'/'+objectId).pipe(map(data => {
      let object = data;
      return object;
    }));
  }


  deleteObjectById(entityName:string, objectId:number): Observable<IResponse> {
    let resUrl = this.API_URL + entityName + '/' + objectId;
    console.log('dbg: '+ resUrl);
    return this.httpClient
      .delete(resUrl)
      .map((data: IResponse) => {
        return data;
      })
      .catch(this.handleError);
  }


  updateObject(entityName: string, jsonObject: Object): Observable<IResponse> {
    let resUrl = this.API_URL + entityName;
    console.log('dbg: '+ resUrl);
    const headers = new HttpHeaders()
      .append('Content-Type' , 'application/json');

    return this.httpClient
      .put(resUrl, jsonObject, { headers: headers })
      .map((data: IResponse) => {
        return data;
      })
      .catch(this.handleError);
  }


  saveObject(entityName: string, jsonObject: Object): Observable<IResponse> {
    let resUrl = this.API_URL + entityName;
    console.log(resUrl);
    const headers = new HttpHeaders()
      .append('Content-Type' , 'application/json');

    return this.httpClient
      .post(resUrl, jsonObject, { headers: headers })
      .map((data: IResponse) => {
        return data;
      })
      .catch(this.handleError);
  }


  //============================
  // form calls
  //============================
  getEntityFormFields(entityName: string) {
    return this.httpClient.get(this.API_FORM_URL + entityName).pipe(map(data => {
      let objectList = data;
      return objectList;
    }));
  }

  getEntityFormFieldsWithValues(entityName: string, objectId: number) {
    return this.httpClient.get(this.API_FORM_URL + entityName + '/' + objectId).pipe(map(data => {
      let objectList = data;
      return objectList;
    }));
  }

  getEntityTitleList(entityName: string) {
    return this.httpClient.get(this.API_TITLE_URL + entityName).pipe(map(data => {
      let objectList = data;
      return objectList;
    }));
  }

  //error handling
  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }


}

