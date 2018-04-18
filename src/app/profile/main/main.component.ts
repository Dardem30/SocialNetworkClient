import {Component} from '@angular/core';
import {AuthService} from '../../share/authService';
import {PhotoService} from '../../share/photoService';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component ({
  selector: 'main-comp',
  templateUrl: './main.component.html'

})
export class MainComponent{
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  user:User;
  photos:Photo[];

  constructor(private photoService:PhotoService,private authService:AuthService,private router:Router) { }

  ngOnInit() {
    this.reboot();
  }
  reboot(){
    this.authService.fetchByUsername(localStorage.getItem("username")).subscribe(res=> {
      this.authService.fetchPhotosById((res.json() as User).id).subscribe(res => this.photos = res.json() as Photo[]);
    })
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.photoService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      console.log(event);
    });

    this.selectedFiles = undefined;
    this.router.navigate(['main']);
  }
  like(id:number){
    this.authService.like(id).subscribe(res=>{this.reboot();console.log(res.json())})
  }
  comment(id:number){
    this.router.navigate(['comment', id]);
  }
}
