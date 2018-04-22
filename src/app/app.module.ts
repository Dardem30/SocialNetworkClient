import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import {HttpModule} from '@angular/http';
import {FormControl, FormsModule} from '@angular/forms';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {AuthService} from './share/authService';
import {AuthGuard} from './guard/authGuard';
import {RegistrationComponent} from './registration/registration.component';
import {HeaderComponent} from './profile/header/header.component';
import {MainComponent} from './profile/main/main.component';
import {PhotoService} from './share/photoService';
import {HttpClientModule} from '@angular/common/http';
import {SearchComponent} from './profile/search/serch.component';
import {AnotherMainComponent} from './profile/anotherProfel/anotherMain.component';
import {CommentPageComponent} from './profile/commentPage/commentPage.component';
import {MessageComponent} from './profile/messages/message';
import {DialogComponent} from './profile/dialog/dialog.component';
import {FriendComponent} from './profile/friends/friend.component';

const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'main', component:ProfileComponent,canActivate: [AuthGuard]},
  {path: 'search/:name', component:SearchComponent,canActivate: [AuthGuard]},
  {path: 'anotherMain/:id', component:AnotherMainComponent,canActivate: [AuthGuard]},
  {path: 'comment/:id', component:CommentPageComponent,canActivate: [AuthGuard]},
  {path: 'message/:id', component:MessageComponent,canActivate: [AuthGuard]},
  {path: 'dialog/:userName', component:DialogComponent,canActivate: [AuthGuard]},
  {path: 'friends/:id', component:FriendComponent,canActivate: [AuthGuard]},
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
    CommentPageComponent,
    MessageComponent,
    DialogComponent,
    FriendComponent
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
