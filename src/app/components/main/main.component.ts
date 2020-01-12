import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Scene } from 'src/app/models/scene';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  @Input() user;
  @Input() scenes:Scene[];
  @Output() add = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() changeSceneNameC = new EventEmitter<string[]>();
  @Output() addProject = new EventEmitter<string>();
  @Output() deleteProject = new EventEmitter<string>();

  constructor(
    private matSnackBar:MatSnackBar
  ) { }

  ngOnInit() {
  }
addS(key: string){
  if(!this.scenes.find(scene => scene.name == key)){
    this.add.emit(key);
  }else{
    this.matSnackBar.open("すでに同名のシーンが存在します。","",{duration: 1500});
  };
}
deleteS(key: string){
  this.delete.emit(key);
}
changeS(oldNm: string, newNm: string){
  if(!this.scenes.find(scene => scene.name == newNm)){
    let arr:string[] = [oldNm, newNm];
    this.changeSceneNameC.emit(arr);
  }else{
    this.matSnackBar.open("すでに同名のシーンが存在します。","",{duration: 1500});
  };
}
addP(key: string){
  this.addProject.emit(key);
}
deleteP(key: string){
  this.deleteProject.emit(key);
}
}
