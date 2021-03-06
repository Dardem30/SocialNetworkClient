import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../share/authService';
import {Router} from '@angular/router';
import {SearchComponent} from '../search/serch.component';

@Component({
  selector: 'header-comp',
  templateUrl: './header.component.html',
  styleUrls:['style.css']

})
export class HeaderComponent implements OnInit{
  user:User;
  userToSupport:User;
  model: any = {};

  constructor(private authService:AuthService,private router:Router,private searchClass:SearchComponent){

  }
  ngOnInit(): void {
    this.authService.fetchByUsername(localStorage.getItem("username")).subscribe(res => this.user=res.json() as User);
    console.log(this.user.username)
  }
  logout(){
    this.authService.logout();
  }
  search(){
    this.router.navigate(['search', this.model.serchText]);
  }
  messages(){
    this.router.navigate(['message', this.user.id]);
  }

  friendList() {
    this.authService.fetchByUsername(localStorage.getItem("username")).subscribe(res=>{
      this.userToSupport=res.json() as User;
      this.router.navigate(["friends",this.userToSupport.id]);
    })
  }
  toMainPage() {
    this.router.navigate(["main"]);
  }
}
