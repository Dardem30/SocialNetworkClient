import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../share/authService';

@Component ({
  selector: 'friend-comp',
  templateUrl: './friend.component.html',
})
export class FriendComponent implements OnInit {
  friends:Friend[];
  constructor(private route: ActivatedRoute,private authService:AuthService,private router:Router) {}
  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.authService.listUnconfermedFriends(params["id"]).subscribe(res=>this.friends=res.json() as Friend[]);
    })
  }

}
