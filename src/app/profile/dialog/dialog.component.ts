import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../share/authService';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnInit{
  you:User;
  he:User;
  messages:Message[];
  model: any = {};

  constructor(private route: ActivatedRoute,private authService:AuthService) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.authService.fetchByUsername(localStorage.getItem("username")).subscribe(res=> {
        this.you=res.json() as User;
        this.authService.dialogTree(params['userName'],this.you.id).subscribe(res => this.messages = res.json() as Message[])
        this.authService.fetchByUsername(params['userName']).subscribe(res=>{
          this.he=res.json() as User;
        })
      })
    });
  }
  sendMessageTo(){
    this.authService.sendMessage(this.he.id,this.model.messageText).subscribe(res=>console.log(res.json()));
    this.ngOnInit()
  }
}
