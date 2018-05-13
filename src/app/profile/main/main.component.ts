import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../share/authService';
import {PhotoService} from '../../share/photoService';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component ({
  selector: 'main-comp',
  templateUrl: './main.component.html'

})
export class MainComponent implements OnInit{
  photos:Photo[]=new Array();
  constructor(private photoService:PhotoService,private authService:AuthService,private router:Router) { }
  ngOnInit(): void {

    this.authService.fetchByUsername(localStorage.getItem("username")).subscribe(res=>{
      this.authService.listFriends((res.json() as User).id).subscribe(res=>{
        for(let friend of res.json() as Friend[]){
          this.authService.friendPhoto(friend.id).subscribe(res=>{
           for(let photo of res.json() as Photo[]){
             this.photos.push(photo);
           }
          })
        }
      })
    })
  }
  userImage() {
    this.router.navigate(["images"])
  }
  like(id:number){
    this.authService.like(id).subscribe(res=>{this.router.navigate(["main"]);console.log(res.json())})
  }
  comment(id:number){
    this.router.navigate(['comment', id]);
  }
}
