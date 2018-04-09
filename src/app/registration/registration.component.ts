import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../share/authService';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent{
  model: any = {};
  error = '';
  constructor(
    private router: Router,
    private authenticationService: AuthService) { }

  registration() {
   this.authenticationService.registration(this.model.username,this.model.password,this.model.email);
   this.router.navigate([''])
  }
}
