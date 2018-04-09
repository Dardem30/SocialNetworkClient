import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import {HttpEvent, HttpRequest} from '@angular/common/http';

@Injectable()
export class AuthService {
  token:string;
  private user1: User;
  constructor(private http:Http,private router:Router){

  }
  login(username:string,password:string):Observable<boolean>{
    let body=JSON.stringify({'username':username,'password':password});
    let header=new Headers();
    header.append('Content-Type','application/json');
    let options=new RequestOptions({headers:header});
   return this.http.post("http://localhost:8080/auth",JSON.parse(body),options)
       .map((response: Response) => {
        let token = response.headers.get('access-token');
         if (token) {
           this.token = token;

           localStorage.setItem('currentUser', token);
           localStorage.setItem('username', username);

           return true;
         } else {
           return false;
         }
      });
  }
  registration(username:string,password:string,email:string) {
    let body = JSON.stringify({'username': username, 'password': password, 'email': email});
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: header});
    this.http.post('http://localhost:8080/signUp', JSON.parse(body), options).subscribe(res => console.log(res));
  }
  fetchByUsername(username:string){
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Token',localStorage.getItem("currentUser"))
    let options = new RequestOptions({headers: header});
   return this.http.get('http://localhost:8080/usersByUsername/'+username,options);
  }
  fetchPhotosById(id:number) {
    let header = new Headers();
    header.append('Token', localStorage.getItem("currentUser"))
    let options = new RequestOptions({headers: header});
    return this.http.get('http://localhost:8080/userPhoto/' + id, options);
  }
  like(id:number){
    const formdata: FormData = new FormData();
    formdata.append('Token',localStorage.getItem("currentUser"));
    formdata.append('username',localStorage.getItem("username"));

    let header=new Headers();
    header.append('Token',localStorage.getItem("currentUser"));
    let options=new RequestOptions({headers:header});
    return this.http.post("http://localhost:8080/photo/like/"+id,formdata,options);
  }
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('username');
    this.router.navigate([''])
  }
}