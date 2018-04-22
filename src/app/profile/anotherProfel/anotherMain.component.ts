import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../share/authService';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'anoth-comp',
  templateUrl: './anotherMain.component.html'

})
export class AnotherMainComponent implements OnInit {
  user:User;
  photos:Photo[];
  model: any = {};

  constructor(private route: ActivatedRoute,private authService:AuthService,private router:Router) {}

  ngOnInit() {
    this.reboot()
  }
  reboot(){
    this.route.params.subscribe(params => {
        this.authService.fetchById(params["id"]).subscribe(res=>{
          this.user=res.json() as User;
          this.authService.fetchPhotosById((res.json() as User).id).subscribe(res=>this.photos=res.json() as Photo[])
        })
  })
  }
  like(id:number){
    this.authService.like(id).subscribe(res=>{this.reboot();console.log(res.json())})
  }
  sendMessage(){
    this.route.params.subscribe(params => {
      this.authService.sendMessage(params['id'],this.model.text).subscribe(res=>console.log(res.json()));
    })
  }
  comment(id:number){
    this.router.navigate(['comment', id]);
  }
  comeback(){
    this.router.navigate(["main"])
  }

  addToFriend() {
    this.route.params.subscribe(params => {
      this.authService.addFriend(params["id"]).subscribe(res=>console.log(res.json()));
    });
  }
}
