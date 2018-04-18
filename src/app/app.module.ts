import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import {HttpModule} from '@angular/http';
import {FormControl, FormsModule} from '@angular/forms';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {Profile} from 'selenium-webdriver/firefox';
import {ProfileComponent} from './profile/profile.component';
import {AuthService} from './share/authService';
import {JwtHelper} from 'angular2-jwt';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {AuthGuard} from './guard/authGuard';
import {RegistrationComponent} from './registration/registration.component';
import {HeaderComponent} from './profile/header/header.component';
import {MainComponent} from './profile/main/main.component';
import {PhotoService} from './share/photoService';
import {HttpClientModule} from '@angular/common/http';
import {SearchComponent} from './profile/search/serch.component';
import {AnotherMainComponent} from './profile/anotherProfel/anotherMain.component';
import {CommentPageComponent} from './profile/commentPage/commentPage.component';

const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'main', component:ProfileComponent,canActivate: [AuthGuard]},
  {path: 'search/:name', component:SearchComponent,canActivate: [AuthGuard]},
  {path: 'anotherMain/:id', component:AnotherMainComponent,canActivate: [AuthGuard]},
  {path: 'comment/:id', component:CommentPageComponent,canActivate: [AuthGuard]},
  {path: 'registration', component:RegistrationComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegistrationComponent,
    HeaderComponent,
    MainComponent,
    SearchComponent,
    AnotherMainComponent,
    CommentPageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard, AuthService,PhotoService,SearchComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
