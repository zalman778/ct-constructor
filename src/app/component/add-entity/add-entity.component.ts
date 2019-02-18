import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ApiService} from '../../service/api.service';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import { NgZone } from '@angular/core';
import { IResponse } from '../../model/response.model';

@Component({
  selector: 'app-add-entity',
  templateUrl: './add-entity.component.html',
  styleUrls: ['./add-entity.component.scss']
})
export class AddEntityComponent implements OnInit {
  entityName: string;

  //map for object form fields
  objectFormMap = new Map();

  //map for addidtional lists for select optioins
  additionalOptionsMap = new Map();

  //binding form and data map
  objectForm = new FormGroup({});

  constructor(private router: Router
            , private route: ActivatedRoute
            , private _apiService: ApiService
            , private ngZone: NgZone
  ) { }

  getKeys1(p_map) {
    return Array.from(p_map.keys());
  }

  getKeys2(p_map, p_fieldName) {
    return Array.from(p_map.get(p_fieldName).keys());
  }

  onSubmit() {
    this._apiService.saveObject(this.entityName, this.objectForm.getRawValue()).subscribe(jsonResponse => {
      if (jsonResponse['status'] == 'ERR') {
        alert(jsonResponse['message']);
        this.ngOnInit();
      } else {
        //redirect to list of enities
        this.ngZone.run(() => this.router.navigateByUrl('/object/'+this.entityName));
      }
    });
  }
  //function for sorting by special predicate
  predicateBy(prop){
    return function(a,b){
      if( a[prop] > b[prop]){
        return 1;
      }else if( a[prop] < b[prop] ){
        return -1;
      }
      return 0;
    }
  }


  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.entityName = params.get('entity_name');

      this._apiService.getEntityFormFields(this.entityName).subscribe(jsonObject => {
        let jsonObjectArray = jsonObject as any[];
        jsonObjectArray.sort(this.predicateBy('index'));

        let objectFormStruct : { [key: string]: AbstractControl} = {};

        jsonObjectArray.forEach(element => {
          if (element['b_show'] == 'true') {
            objectFormStruct[element['name']] = new FormControl();


            let fieldType = element['type'].split(':')[0];
            if (fieldType == 'ref') {
              let refTable = element['type'].split(':')[1];
              //loading options

              //TODO: add filtering
              let selMap = new Map();
              this._apiService.getEntityTitleList(refTable).subscribe(_jsonObject => {
                for (let _prop in _jsonObject) {
                  selMap.set(_prop, _jsonObject[_prop]);
                }

                // if nullable is true, then we can add select null from list
                if (element['nullable'] == 'YES') {
                  selMap.set('null', '--');
                }
                this.additionalOptionsMap.set(element['name'], selMap);
              });
              this.objectFormMap.set(element['name'], fieldType);
            } else {
              this.objectFormMap.set(element['name'], element['type']);
            }
          }
        });

        //objectFormStruct['id'].disable(true);
        this.objectForm = new FormGroup(objectFormStruct);

      });
    });
  }
}
