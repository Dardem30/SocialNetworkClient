import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from '../../../node_modules/rxjs';
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
@Injectable()
export class PhotoService {
  constructor(private http:Http){

  }
  pushFileToStorage(file: File) {
    const formdata: FormData = new FormData();
    console.log(localStorage.getItem("currentUser"));
    formdata.append('file', file);
    formdata.append('username', localStorage.getItem("username"));
    formdata.append('Token',localStorage.getItem("currentUser"));
    formdata.append('enctype', 'multipart/form-data');

    let header=new Headers();
    header.append('Token',localStorage.getItem("currentUser"));
    header.append('enctype', 'multipart/form-data');
    let options=new RequestOptions({headers:header});
    return this.http.post("http://localhost:8080/photo",formdata,options);
  }
}
