import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthenticationService} from '../../service/auth.service';
import {AlertService} from '../../service/alert.service';
import {ApiService} from '../../service/api.service';
import {ListFullEntityComponent} from '../list-full-entity/list-full-entity.component';

/*
  Компонент авторизации
 */
@Component({
  templateUrl: 'login.component.html'
 ,styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private apiService: ApiService,
    private ngZone: NgZone,
    private cmpListFullEntity: ListFullEntityComponent
  ) {}

  ngOnInit() {

    //если есть userConfig, значит уже авторизирован, перенаправляем
    if (localStorage.getItem('userConfig')) {
      this.ngZone.run(() => this.router.navigateByUrl('/objects/'));
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    //creating json object
    let loginObject = {
      "nickname": this.f.username.value,
      "password": this.f.password.value
    };

    //обращаемя к сервису авторизации
    this.authenticationService.login(loginObject)

      .subscribe(
        data => {

          if (data['status'] == 'OK') {
            //получаем от сервера авторизации адрес сервера компании (company_db) и сохраняем его
            this.apiService.API_HOST = data['payload']['connection_url'];

            localStorage.setItem('userConfig', JSON.stringify(data['payload']));

            this.cmpListFullEntity.setAuthSubj(true);
            //this.cmpListFullEntity.drawContent();

            this.ngZone.run(() => this.router.navigateByUrl('/objects/'));
          } else {
            this.alertService.error(data['message']);
          }
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
