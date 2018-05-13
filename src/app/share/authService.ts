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
  private user2:User;
  constructor(private http:Http,private router:Router){

  }
  login(username:string,password:string):Observable<boolean>{
    let body=JSON.stringify({'username':username,'password':password});
    let header=new Headers();
    header.append('Content-Type','application/json');
    let options=new RequestOptions({headers:header});
   return this.http.post("https://socialnetwork2.herokuapp.com/auth",JSON.parse(body),options)
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
  registration(username:string,password:string,email:string,name:string,surname:string) {
    let body = JSON.stringify({'username': username, 'password': password, 'email': email,'name':name,'surname':surname});
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: header});
    this.http.post('https://socialnetwork2.herokuapp.com/signUp', JSON.parse(body), options).subscribe(res => console.log(res));
  }
  fetchByUsername(username:string){
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Token',localStorage.getItem("currentUser"))
    let options = new RequestOptions({headers: header});
   return this.http.get('https://socialnetwork2.herokuapp.com/usersByUsername/'+username,options);
  }
  fetchPhotosById(id:number) {
    let header = new Headers();
    header.append('Token', localStorage.getItem("currentUser"))
    let options = new RequestOptions({headers: header});
    return this.http.get('https://socialnetwork2.herokuapp.com/userPhoto/' + id, options);
  }
  findOnlyPhotoById(photoId){
    let header = new Headers();
    header.append('Token', localStorage.getItem("currentUser"))
    let options = new RequestOptions({headers: header});
    return this.http.get('https://socialnetwork2.herokuapp.com/photo/' +photoId, options);
  }
  like(id:number){
    const formdata: FormData = new FormData();
    formdata.append('Token',localStorage.getItem("currentUser"));
    formdata.append('username',localStorage.getItem("username"));

    let header=new Headers();
    header.append('Token',localStorage.getItem("currentUser"));
    let options=new RequestOptions({headers:header});
    return this.http.post("https://socialnetwork2.herokuapp.com/photo/like/"+id,formdata,options);
  }
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('username');
    this.router.navigate([''])
  }
  fetchByName(name:string){
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Token',localStorage.getItem("currentUser"))
    let options = new RequestOptions({headers: header});
    return this.http.get('https://socialnetwork2.herokuapp.com/usersName/'+name,options);
  }
  fetchById(userId:number){
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Token',localStorage.getItem("currentUser"))
    let options = new RequestOptions({headers: header});
    return this.http.get('https://socialnetwork2.herokuapp.com/users/'+userId,options);
  }
  dialogTree(userName:string,userId:number){
    let header = new Headers();
    header.append('Token',localStorage.getItem("currentUser"))
    let options = new RequestOptions({headers: header});
    return this.http.get('https://socialnetwork2.herokuapp.com/dialogTree/'+userId+"/"+userName,options);
  }
  sendComment(photoId: number,text:string){
    const formdata: FormData = new FormData();
    formdata.append('username',localStorage.getItem("username"));
    formdata.append('text',text);
    let header = new Headers();
    header.append('Token',localStorage.getItem("currentUser"))
    let options = new RequestOptions({headers: header});
    return this.http.post('https://socialnetwork2.herokuapp.com/comment/'+photoId,formdata,options);
  }
  sendMessage(userId:number, text:string){
    this.fetchByUsername(localStorage.getItem("username")).subscribe(res=> {
      this.user2=res.json() as User;
    })
      const formdata: FormData = new FormData();
      formdata.append('text', text);
      formdata.append('name',this.user2.name);
      let header = new Headers();
      header.append('Token', localStorage.getItem("currentUser"))
      let options = new RequestOptions({headers: header});
      return this.http.post('https://socialnetwork2.herokuapp.com/sendMessage/' + userId, formdata, options);

  }
  sendAnswer(comentId: number,text:string){
    const formdata: FormData = new FormData();
    formdata.append('username',localStorage.getItem("username"));
    formdata.append('text',text);
    let header = new Headers();
    header.append('Token',localStorage.getItem("currentUser"))
    let options = new RequestOptions({headers: header});
    return this.http.post('https://socialnetwork2.herokuapp.com/answer/'+comentId,formdata,options);
  }
  addFriend(friendId:number){
    const formdata: FormData = new FormData();
    formdata.append('username',localStorage.getItem("username"));
    let header = new Headers();
    header.append('Token',localStorage.getItem("currentUser"))
    let options = new RequestOptions({headers: header});
    return this.http.post('https://socialnetwork2.herokuapp.com/addFriend/'+friendId,formdata,options);
  }
  confirm(name:string){
    const formdata: FormData = new FormData();
    formdata.append('username',localStorage.getItem("username"));
    let header = new Headers();
    header.append('Token',localStorage.getItem("currentUser"))
    let options = new RequestOptions({headers: header});
    return this.http.post('https://socialnetwork2.herokuapp.com/confirm/'+name,formdata,options);
  }
  listUnconfermedFriends(id:number){
    let header = new Headers();
    header.append('Token',localStorage.getItem("currentUser"))
    let options = new RequestOptions({headers: header});
    return this.http.get('https://socialnetwork2.herokuapp.com/findAllUnconfermdFriend/'+id,options);
  }
  listFriends(id:number){
    let header = new Headers();
    header.append('Token',localStorage.getItem("currentUser"))
    let options = new RequestOptions({headers: header});
    return this.http.get('https://socialnetwork2.herokuapp.com/findAllFriends/'+id,options);
  }
  friendPhoto(friendId:number){
    let header = new Headers();
    header.append('Token',localStorage.getItem("currentUser"))
    let options = new RequestOptions({headers: header});
    return this.http.get('https://socialnetwork2.herokuapp.com/friendPhoto/'+friendId,options);
  }

}
