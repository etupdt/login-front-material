import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { UserLibComponent } from './user-lib.component';
import { UserLibService } from './user-lib.service';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    UserLibComponent,
    UserComponent,
    UsersComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    MatPaginatorModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    UserLibComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class UserLibModule {
  public static forRoot(arg: {useBackend: string}): ModuleWithProviders<UserLibModule> {
    return {
      ngModule: UserLibModule,
      providers: [
        UserLibService,
        {provide: 'optionsUserLib', useValue: arg}
      ]
    }
  }
}
