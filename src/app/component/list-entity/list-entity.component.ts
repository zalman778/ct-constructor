import {Component, OnInit, NgZone} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ApiService} from '../../service/api.service';
import {element} from 'protractor';

@Component({
  selector: 'app-list-entity',
  templateUrl: './list-entity.component.html',
  styleUrls: ['./list-entity.component.scss']
})
export class ListEntityComponent implements OnInit {

  entityName: string;
  fullObjectsMap = new Map();
  objectFieldsList = new Array();

  constructor(private router: Router, private route: ActivatedRoute, private _apiService: ApiService, private ngZone: NgZone) {

  }

  getKeys(p_map) {
    return Array.from(p_map.keys());
  }

  getValues(p_map, p_key) {
    return Array.from(p_map.get(p_key).values());
  }


  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let currName = params.get('entity_name');

      this.entityName = currName;

      this._apiService.getObjectsList(this.entityName).subscribe(data => {

        let jsonArray = data as any[];

        let prevId;
        let firstLoop = true;
        this.fullObjectsMap = new Map();
        this.objectFieldsList = new Array();

        jsonArray.forEach(element=>{
          let objectMap = new Map();
          let jsonArrayInner = element as any[];
          jsonArrayInner.forEach(elementValue=>{
            for (let prop in elementValue) {
              if (prop == 'id') {
                prevId = elementValue[prop];
              }
              if (firstLoop) {
                this.objectFieldsList.push(prop);
              }
              objectMap.set(prop, elementValue[prop]);
            }
          });
          firstLoop = false;
          this.fullObjectsMap.set(prevId, objectMap);
        });
      });
    });
  }

  removeEntity(entityName: string, objectId: number) {
    this._apiService.deleteObjectById(entityName, objectId).subscribe(
      jsonResponse => {
        if (jsonResponse['status'] == 'ERR') {
          alert(jsonResponse['message']);
        } else {
          this.fullObjectsMap.delete(objectId);
        }
      });
  }

  nav_newForm() {
    //redirect to new form
    this.ngZone.run(() => this.router.navigateByUrl('/object/add/'+this.entityName));
  }

}
