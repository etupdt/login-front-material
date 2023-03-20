import { ModuleWithProviders, NgModule } from '@angular/core';
import { StructComponent } from './struct.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from  '@angular/material/form-field';
import { MatListModule } from  '@angular/material/list';
import { MatButtonModule } from  '@angular/material/button';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from './auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { ErrorInterceptorService } from './error-interceptor.service';
import { MenuItemPipe } from './menu-item.pipe';

@NgModule({
  declarations: [
    StructComponent,
    HeaderComponent,
    AuthModalComponent,
    MenuItemPipe,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    MatDialogModule,
    MatToolbarModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatListModule,
    MatButtonModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatDialogModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule
  ],
  exports: [
    StructComponent,
    HeaderComponent,
    AuthModalComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true}
  ],
  entryComponents: [AuthModalComponent]
})
export class StructModule {
  public static forRoot(arg: {useBackend: string}): ModuleWithProviders<StructModule> {
    return {
      ngModule: StructModule,
      providers: [
        AuthService,
        {provide: 'optionsAuthent', useValue: arg}
      ]
    }
  }
}
