import {Component, NgZone, OnInit} from '@angular/core';
import {ApiService} from '../../service/api.service';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-list-full-entity',
  templateUrl: './list-full-entity.component.html',
  styleUrls: ['./list-full-entity.component.scss']
})
export class ListFullEntityComponent implements OnInit {
  private _isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuthenticatedObs: Observable<boolean> = this._isAuthenticatedSubject.asObservable();


  fullEntityList = []


  public setAuthSubj(value: boolean) {
    console.log('async set '+value)
    this._isAuthenticatedSubject.next(value);
  }

  public profile_username: string;

  constructor(
    private  _apiService:  ApiService
  , private ngZone: NgZone
  , private router: Router
  ) { }

  ngOnInit() {
    this.drawContent();
  }

  public drawContent() {
    let jsonUserConfig = JSON.parse(localStorage.getItem('userConfig'));

    if ( jsonUserConfig === null) {
      // logged in so return true
      console.log("user logged out");
      this._isAuthenticatedSubject.next(false);
      return false;
    } else {
      console.log("user logged in");
      this._isAuthenticatedSubject.next(true);
    }

    this.profile_username = jsonUserConfig['nickname'];


    this._apiService.getFullEntityList().subscribe(jsonArray => {
      for (let prop in jsonArray) {
        this.fullEntityList.push(jsonArray[prop]);
      }
    });
  }

  onLogout() {

    localStorage.clear();
    this.ngOnInit();
    this.ngZone.run(() => this.router.navigateByUrl('/'));
  }
}
