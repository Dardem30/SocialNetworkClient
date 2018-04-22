import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../share/authService';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'anoth-comp',
  templateUrl: './message.html'
})
export class MessageComponent implements OnInit{
  user:User;

  constructor(private route: ActivatedRoute,private authService:AuthService,private router:Router) {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.authService.fetchById(params["id"]).subscribe(res=>{
        this.user=res.json() as User;
        console.log(res.json())
      })
    })
  }
  toDialog(userName:string){
    this.router.navigate(["dialog",userName])
  }
}
