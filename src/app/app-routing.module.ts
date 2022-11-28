import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HabilitationComponent } from "./components/habilitation/habilitation.component";
import { LoginLayoutComponent } from "./components/login-layout/login-layout.component";
import { LoginComponent } from "./components/login/login.component";
import { MembreListComponent } from "./components/membre-list/membre-list.component";
import { NotFound404Component } from "./components/not-found404/not-found404.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { UserComponent } from "./components/user/user.component";
import { HomeLayoutComponent } from "./components/home-layout/home-layout.component";
import { MinistereComponent } from "./components/ministere/ministere.component";
import { AuthGuard } from "./auth-guard";
import { MembreComponent } from "./components/membre/membre.component";
import { TableauDeBordComponent } from "./components/tableau-de-bord/tableau-de-bord.component";

const routes : Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginLayoutComponent,
        children:[
            { path :'', component: LoginComponent}
        ]
    },
    {
        path: 'home',
        component: HomeLayoutComponent,
        children:[
            { path :'profile', component: ProfileComponent, canActivate: [AuthGuard]},
            { path :'user', component: UserComponent, canActivate: [AuthGuard]},
            { path :'habilitation', component: HabilitationComponent, canActivate: [AuthGuard]},
            { path :'liste-des-membres', component: MembreComponent, canActivate: [AuthGuard]},
            { path :'ministere', component: MinistereComponent, canActivate: [AuthGuard]},
            { path :'dashboard', component: TableauDeBordComponent, canActivate: [AuthGuard]}
        ]
    },
    // {
    //     path: 'home',
    //     component: AppComponent,
    //     // canActivate: [AuthGuard]
    // },
    // {
    //     path: 'profile',
    //     component: ProfileComponent,
    //     // canActivate: [AuthGuard]
    // },
    // {
    //     path: 'habilitation',
    //     component: HabilitationComponent,
    //     // canActivate: [AuthGuard]
    // },
    // {
    //     path: 'liste-des-membres',
    //     component: MembreListComponent,
    //     // canActivate: [AuthGuard]
    // },
    {
        path: '**',
        component: NotFound404Component
    }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}