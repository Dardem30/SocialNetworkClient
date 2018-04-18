import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../share/authService';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'comment-comp',
  templateUrl: './comment.component.html'

})
export class CommentPageComponent implements OnInit{
  photo:Photo;
  user:User;
  model: any = {};
  ucmap:Map<String,String>;

  constructor(private authService:AuthService,private route: ActivatedRoute,private router:Router){

  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.authService.findOnlyPhotoById( params['id']).subscribe(res => this.photo = res.json() as Photo);
    })
    for(let comment of this.photo.comments){
      this.authService.fetchById(comment.userId).subscribe(res=> this.user=res.json() as User);
      this.ucmap.set(this.user.name,comment.text);
    }
  }
  send(){
    this.route.params.subscribe(params => {
      this.authService.sendComment(params["id"],this.model.commentText).subscribe(res=>{console.log(res.json());
    })
  })
}
  sendAnswer(commentId:number){
    this.authService.sendAnswer(commentId,this.model.answer).subscribe(res=> console.log(res.json() as Answer))
  }

}
