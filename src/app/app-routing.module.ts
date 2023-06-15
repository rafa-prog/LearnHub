import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './forum/pages/home/home.component';
import { CreateUserComponent } from './users/pages/create/create.component';
import { ErrorComponent } from './forum/pages/error/error.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'topics',
    component: HomeComponent
  },
  {
    path: 'topics/:name',
    component: HomeComponent
  },
  {
    path: 'signin',
    component: CreateUserComponent
  },
  {
    path: 'signup',
    component: CreateUserComponent
  },
  {
    path: 'erro',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
