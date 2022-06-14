import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { ActionBtnComponent } from './components/action-btn/action-btn.component';
import { PreloaderLinearComponent } from './components/preloader-linear/preloader-linear.component';
import { PreloaderCircleComponent } from './components/preloader-circle/preloader-circle.component';
import { CardComponent } from './components/card/card.component';
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
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { materialize } from 'rxjs/operators';
import { UserComponent } from './components/user/user.component';
import { MatchValueDirective } from './directives/match-value.directive';

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    NavMenuComponent,
    ActionBtnComponent,
    PreloaderLinearComponent,
    PreloaderCircleComponent,
    CardComponent,
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
  ],
  imports: [
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxSpinnerModule,
  ],
  providers: [
    ToastrService,
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
