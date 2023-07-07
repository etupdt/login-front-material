import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from 'projects/user-lib/src/lib/user/user.component';
import { UsersComponent } from 'projects/user-lib/src/lib/users/users.component';
import { ArticlesComponent } from './articles/articles.component';
import { DocumentComponent } from './document/document.component';
import { HomeComponent } from './home/home.component';
import { LibraryComponent } from './library/library.component';
import { LivresComponent } from './library/livres/livres.component';
import { LivreComponent } from './library/livre/livre.component';
import { ExemplaireComponent } from './library/exemplaire/exemplaire.component';
import { AuteurComponent } from './library/auteur/auteur.component';
import { AuteursComponent } from './library/auteurs/auteurs.component';
import { AdherentComponent } from './library/adherent/adherent.component';
import { AdherentsComponent } from './library/adherents/adherents.component';
import { ExemplairesComponent } from './library/exemplaires/exemplaires.component';
import { EmpruntComponent } from './library/emprunt/emprunt.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'bibliothèque',
    component: LibraryComponent,
    children: [
      {
        path: 'livres',
        component: LivresComponent
      },
      {
        path: 'livre',
        component: LivreComponent
      },
      {
        path: 'auteur',
        component: AuteurComponent
      },
      {
        path: 'auteurs',
        component: AuteursComponent
      },
      {
        path: 'adherents',
        component: AdherentsComponent
      },
      {
        path: 'adherent',
        component: AdherentComponent
      },
      {
        path: 'exemplaires',
        component: ExemplairesComponent
      },
      {
        path: 'exemplaire',
        component: ExemplaireComponent
      },
      {
        path: 'emprunt',
        component: EmpruntComponent
      }
    ]
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
