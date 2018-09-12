import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../share/authService';

@Component ({
  selector: 'friend-comp',
  templateUrl: './friend.component.html',
})
export class FriendComponent implements OnInit {
  friendsUnconfermd:Friend[];
  friends:Friend[];
  userSupport:User;
  constructor(private route: ActivatedRoute,private authService:AuthService,private router:Router) {}
  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.authService.listUnconfermedFriends(params["id"]).subscribe(res=>this.friendsUnconfermd=res.json() as Friend[]);
      this.authService.listFriends(params["id"]).subscribe(res=>this.friends=res.json() as Friend[]);
    })
  }
  confirm(name:string){
      this.authService.confirm(name).subscribe(res => console.log(res.json()));
      this.router.navigate(["main"]);
  }

}
