import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StructModule } from 'projects/struct/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserLibModule } from 'projects/user-lib/src/public-api';
import { DocumentComponent } from './document/document.component';
import { ArticlesComponent } from './articles/articles.component';
import { HomeComponent } from './home/home.component';

import { environment } from './../environments/environment';
import { LibraryComponent } from './library/library.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LivresComponent } from './library/livres/livres.component';
import { LivreComponent } from './library/livre/livre.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuteurComponent } from './library/auteur/auteur.component';
import { AuteursComponent } from './library/auteurs/auteurs.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ActivesPipe } from './library/actives.pipe';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTreeModule} from '@angular/material/tree';
import { SaveDialogComponent } from './save-dialog/save-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AdherentComponent } from './library/adherent/adherent.component';
import { AdherentsComponent } from './library/adherents/adherents.component';
import { ExemplairesComponent } from './library/exemplaires/exemplaires.component';
import { EmpruntComponent } from './library/emprunt/emprunt.component';
import { FindDialogComponent } from './library/find-dialog/find-dialog.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    DocumentComponent,
    ArticlesComponent,
    HomeComponent,
    LibraryComponent,
    LivresComponent,
    LivreComponent,
    AuteurComponent,
    AuteursComponent,
    ActivesPipe,
    ErrorDialogComponent,
    SaveDialogComponent,
    AdherentComponent,
    AdherentsComponent,
    ExemplairesComponent,
    EmpruntComponent,
    FindDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StructModule.forRoot({ useBackend: environment.useBackend }),
    UserLibModule.forRoot({ useBackend: environment.useBackend }),
    NgbModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatButtonToggleModule,
    MatTreeModule,
    MatDialogModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
