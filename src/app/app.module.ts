import { ModuleWithProviders, NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    DocumentComponent,
    ArticlesComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StructModule.forRoot({ useBackend: 'https://localhost:8000' }),
    UserLibModule.forRoot({ useBackend: 'https://localhost:8000' }),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
