import { LOCALE_ID, NgModule, Renderer2 } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { MembreListComponent } from './components/membre-list/membre-list.component';
import { MembreItemComponent } from './components/membre-item/membre-item.component';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { ProfileComponent } from './components/profile/profile.component';
import { HabilitationComponent } from './components/habilitation/habilitation.component';
import { LoginComponent } from './components/login/login.component';
import { LoginLayoutComponent } from './components/login-layout/login-layout.component';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { NotFound404Component } from './components/not-found404/not-found404.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './components/user/user.component';
import { MatchValueDirective } from './directives/match-value.directive';
import { MinistereComponent } from './components/ministere/ministere.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogProfileAddComponent } from './components/dialog-profile-add/dialog-profile-add.component';
import { DialogProfileEditComponent } from './components/dialog-profile-edit/dialog-profile-edit.component';
import { DialogUserAddComponent } from './components/dialog-user-add/dialog-user-add.component';
import { DialogUserEditComponent } from './components/dialog-user-edit/dialog-user-edit.component';
import { DialogMinisterAddComponent } from './components/dialog-minister-add/dialog-minister-add.component';
import { DialogMinisterEditComponent } from './components/dialog-minister-edit/dialog-minister-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    MembreListComponent,
    MembreItemComponent,
    ProfileComponent,
    HabilitationComponent,
    LoginComponent,
    LoginLayoutComponent,
    HomeLayoutComponent,
    NotFound404Component,
    UserComponent,
    MatchValueDirective,
    MinistereComponent,
    DialogProfileAddComponent,
    DialogProfileEditComponent,
    DialogUserAddComponent,
    DialogUserEditComponent,
    DialogMinisterAddComponent,
    DialogMinisterEditComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatDividerModule,
    MatMenuModule,
    MatDialogModule
  ],
  providers: [
    NgxSpinnerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    registerLocaleData(fr.default);
  }
}
