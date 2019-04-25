import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ListFullEntityComponent} from './component/list-full-entity/list-full-entity.component';
import {ListEntityComponent} from './component/list-entity/list-entity.component';
import {EditEntityComponent} from './component/edit-entity/edit-entity.component';
import {PageNotFoundComponent} from './component/page-not-found/page-not-found.component';
import {AddEntityComponent} from './component/add-entity/add-entity.component';
import {LoginComponent} from './component/login/login.component';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'object/:entity_name', component: ListEntityComponent, canActivate: [AuthGuard] },
  { path: 'object/add/:entity_name', component: AddEntityComponent, canActivate: [AuthGuard] },
  { path: 'object/:entity_name/:id', component: EditEntityComponent, canActivate: [AuthGuard] },
 // { path: 'objects', component: ListFullEntityComponent, canActivate: [AuthGuard]  },
  { path: '**',   component: PageNotFoundComponent }

];
/*
  Компонент навишации
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
   ListFullEntityComponent
  ,ListEntityComponent
  ,AddEntityComponent
  ,EditEntityComponent
  ,PageNotFoundComponent
  ,LoginComponent
]
