import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../share/authService';

@Component({
  selector: 'header-comp',
  templateUrl: './header.component.html',
  styleUrls:['style.css']

})
export class HeaderComponent implements OnInit{
  user:User;
  constructor(private authService:AuthService){

  }
  ngOnInit(): void {
    this.authService.fetchByUsername(localStorage.getItem("username")).subscribe(res => this.user=res.json() as User);
    console.log(this.user.username)
  }
  logout(){
    this.authService.logout();
  }
}
