import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../share/authService';
import {ActivatedRoute, Router} from '@angular/router';

@Component ({
  selector: 'search-comp',
  templateUrl: './search.component.html'

})
export class SearchComponent implements OnInit {
  name:string;
  users:User[];
  constructor(private route: ActivatedRoute,private authService:AuthService,private router:Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.authService.fetchByName(params["name"])
        .subscribe(res=>{
          this.users=res.json() as User[]
        });
    });
  }
  toAnother(id:number){
    this.router.navigate(['anotherMain',id])
  }

}
