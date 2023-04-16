import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from 'projects/user-lib/src/lib/user/user.component';
import { UsersComponent } from 'projects/user-lib/src/lib/users/users.component';
import { ArticlesComponent } from './articles/articles.component';
import { DocumentComponent } from './document/document.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'document',
    component: DocumentComponent,
  },
  {
    path: 'articles',
    component: ArticlesComponent,
  },  
  {
    path: 'user',
    component: UserComponent,
  },  
  {
    path: 'users',
    component: UsersComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
