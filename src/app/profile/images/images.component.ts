import {Component, OnInit} from '@angular/core';
import {PhotoService} from '../../share/photoService';
import {Router} from '@angular/router';
import {AuthService} from '../../share/authService';

@Component({
  selector: 'img-comp',
  templateUrl: './image.component.html'

})
export class ImagesComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = {percentage: 0};
  user: User;
  photos: Photo[];

  constructor(private photoService: PhotoService, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.reboot();
  }

  reboot() {
    this.authService.fetchByUsername(localStorage.getItem('username')).subscribe(res => {
      this.authService.fetchPhotosById((res.json() as User).id).subscribe(res => this.photos = res.json() as Photo[]);
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    let fileName = this.currentFileUpload.name.split(".");
    let fileExtend = fileName[fileName.length - 1];
    console.log(fileExtend);
    if (fileExtend == 'jpeg' || fileExtend == 'jpg' || fileExtend == 'png') {
      this.photoService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
        console.log(event);
      });
    } else {
      alert('wrong file format')
    }
    this.selectedFiles = undefined;
    this.router.navigate(['main']);
  }

  like(id: number) {
    this.authService.like(id).subscribe(res => {
      this.reboot();
      console.log(res.json());
    });
  }

  comment(id: number) {
    this.router.navigate(['comment', id]);
  }
}
